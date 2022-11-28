import express, { json, urlencoded } from "express";
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import routes from './routes/products.js'


const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(json());
app.use(urlencoded({ extended: true }));

app.set("views", join(__dirname, "/views"))
app.set("view engine", "pug")

app.use('/', routes)

app.listen(3000, ()=>{
    console.log('server listening port 3000')
})