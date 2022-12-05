import express, { json, urlencoded } from 'express';
import {Server as IOServer} from 'socket.io';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import productsRouter from './routes/main.js';
import Contenedor, {Messages} from "./contenedor.js";
import moment from 'moment'

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(json());
app.use(urlencoded({extended:true}))

const api = new Contenedor(join(__dirname, "/products.txt"))
const apiMessages = new Messages(join(__dirname, "/messages.txt"))
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
}));
    
app.set("view engine", "hbs");
app.set("views", join(__dirname, '/views'));
app.use(express.static(__dirname + "/views/layouts"));

app.use('/', productsRouter)


io.on('connection', async (socket)=>{
    console.log(`new connection, socket ID: ${socket.id}`)
    
    socket.emit("server:products", await api.getAll());
    socket.on("client:product", async (product) => {
        await api.save({title:product.title, price: product.price, img:product.img})
        io.emit("server:products", await api.getAll());
    })
    
    socket.emit("server:message", await apiMessages.getAll())
    console.log(await apiMessages.getAll())
    
    socket.on("client:message",async (message)=>{
        const date = moment().format('DD/MM/YYYY HH:mm:ss')
        await apiMessages.save({email:message.email, message:message.message, date})
        io.emit("server:message", await apiMessages.getAll())
        console.log(await apiMessages.getAll())
    })
})
app.on('error', (err) => {
    console.log(err);
})