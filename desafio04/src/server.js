import express, { json, urlencoded } from 'express'
import productsRouter from './routes/productos.route.js'
import { fileURLToPath } from "url";
import path, { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000;

app.use(json())
app.use(urlencoded({extended:true}))
app.use("/static", express.static(__dirname, + "/public"))
app.use('/api/products',productsRouter)
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, (err)=>{
    err? (console.log(`error listening to port ${PORT}, error: ${err}`))
    :(console.log(`listening port ${PORT}, dir:${__dirname}`))
})
