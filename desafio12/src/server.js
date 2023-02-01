import express, { json, urlencoded } from 'express';
import {Server as IOServer} from 'socket.io';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import productsRouter from './routes/main.js';
import ApiProducts, {ApiMessages} from "./api/api.js";
import config from "./db/mysql.js"
import sqliteConfig from './db/sqlite.js';
import moment from 'moment';
import session from 'express-session';
import loginRouter from './routes/login.js'
import MongoStore from "connect-mongo";





const __dirname = dirname(fileURLToPath(import.meta.url));

const isLogin = (req, res, next)=>{
    if (req.path != '/login'){
        req.session.user? next() : res.redirect('/login')
    }else{
        next()
    }
}


const app = express();
app.use(json());
app.use(urlencoded({extended:true}))


const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
app.use(
    session({
        secret: "coderhouse",
        rolling: true,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl:'mongodb+srv://admin:admin123@juanbaquiroga.x9kwboy.mongodb.net/test',
            mongoOptions,
            ttl: 600,
        }),
    })
);
app.use(isLogin)
    
app.use('/', productsRouter)
app.use('/', loginRouter)




const api = new ApiProducts(config, "products")
const apiMessages = new ApiMessages(sqliteConfig, "messages")

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