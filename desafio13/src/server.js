import express, { json, urlencoded } from 'express';
import {Server as IOServer} from 'socket.io';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import ApiProducts, {ApiMessages} from "./api/api.js";
import config from "./db/mysql.js"
import sqliteConfig from './db/sqlite.js';
import moment from 'moment';
import session from 'express-session';
import router from './routes/main.js';
import passport from "passport";
import { passportStrategies } from "./lib/passport.lib.js";
import mongoose from 'mongoose'
import { User } from './tables/user.model.js'


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(json());
app.use(urlencoded({extended:true}))


app.use(
    session({
        secret: "coderhouse",
        rolling: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", passportStrategies.loginStrategy);
passport.use("register", passportStrategies.registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    const data = await User.findById(id);
    done(null, data)
});

    
app.use('/', router)




const api = new ApiProducts(config, "products")
const apiMessages = new ApiMessages(sqliteConfig, "messages")

await mongoose.connect("mongodb://localhost:27017/passport");
const expressServer = app.listen(3000, ()=>{
console.log('server listening port 3000')
})

const io = new IOServer(expressServer)


app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main.html",
        layoutsDir: join(__dirname, "/views/layouts"),
        partialsDir: join(__dirname, "/views/partials"),
    }
));
    
app.set("view engine", "hbs");
app.set("views", join(__dirname, '/views'));
app.use(express.static(__dirname + "/views/layouts"));



io.on('connection', async (socket)=>{
    console.log(`new connection, socket ID: ${socket.id}`)
    
    socket.emit("server:products", await api.selectAll());
    socket.on("client:product", async (product) => {
        await api.insertProduct(product)
        io.emit("server:products", await api.selectAll());
    })
    
    socket.emit("server:message", await apiMessages.selectAll())
    
    socket.on("client:message",async (message)=>{
        const date = moment().format('DD/MM/YYYY HH:mm:ss')
        await apiMessages.insertMessage({email:message.email, message:message.message, date})
        io.emit("server:message", await apiMessages.selectAll())
        console.log(await apiMessages.selectAll())
    })
})
app.on('error', (err) => {
    console.log(err);
})