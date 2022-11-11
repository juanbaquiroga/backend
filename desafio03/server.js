const express = require('express')
const Contenedor = require('./contenedor')


const contenedor = new Contenedor('productos.txt')
const app = express()
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
})
let visitas = 0
const products = contenedor.getAll()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//RUTAS


app.get('/productos', (req, res) => {
    res.send(products.map((product)=>`${product.title} : $${product.price}` ))

})
app.get('/productoRandom', (req, res) => {
    const index = getRandomInt(4)
    let producto = products[index]
    
    res.send(`
    <div>
    <h1>${producto.title}</h1>
    <h2>$${producto.price}</h2>
    <img style="width:1000px" src=${producto.img}></img>
    </div>
    `)
})
