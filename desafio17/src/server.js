import express, { json, urlencoded } from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import router from './routes/main.js';
import args from './yargs/yargs.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(json());
app.use(urlencoded({extended:true}))



    
app.use('/', router)


app.listen(args.port, ()=>{
console.log(`server listening port ${args.port}`)})



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


app.on('error', (err) => {
    console.log(err);
})