import express, { urlencoded, json }from 'express';
import productsRouter from './router/products.js';
import cartRouter from './router/cart.js';


export const admin = true
const app = express()

app.use(json())
app.use(urlencoded({extended:true}))



app.use('/api/', productsRouter)
app.use('/api/', cartRouter)

app.use((req, res, next)=>{
    res.json({error: -2, descipcion: `ruta ${req.path} metodo ${req.method} no implementada`})
})

app.listen(3000, ()=>{
    console.log('server listening port 3000')
})
