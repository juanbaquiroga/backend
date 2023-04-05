import { productService, cartService } from '../services/index.js'
import { createTransport } from "nodemailer";
import logger from '../lib/logger.lib.js';
import twilio from "twilio";

const accountSid = "ACf8a3c6e4f5755b9f6e3c31accfb01ac7";
const authToken = "0f95f1ead0438caf2a47943a8329aa76";

const client = twilio(accountSid, authToken);



const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sylvester37@ethereal.email",
    pass: "z4jDd5658uZt3Wj7eN",
  },
});



const getIndex = async (req, res, next)=>{
    try {
        const products = await productService.findAllProducts();
        const user = req.user
        res.render('home', {products, username: user.username, userImg:user.img})
    } catch (err) {
        next(err);
    }
}

const productForm = (req, res, next)=>{
    try {
        res.render('product-form')
    } catch (err) {
        next(err)
    }
}
const saveProd = (req, res, next)=>{
    try {
    const {name, price, stock, img} = req.body;
    productService.createProduct({ name, price, stock, img})

    res.redirect('/')
    } catch (err) {
        next(err)
    }
}
const addToCart = async (req, res)=>{
    const id = req.body.prodId
    const product = await productService.findProductById(id)
    const username = req.user.username
    await cartService.pushToCart(username, product)
    res.redirect('/')
}
const cart = async (req, res, next) => {
    try{
        const user = req.user
        const cart = await cartService.findCartByFilter(user.username);
        const products = cart.products
        res.render("cart", {products, hasAny:true, username: user.username, userImg:user.img})
    } catch (err){
        next(err)
    }
}
const cartPost = async (req, res) =>{
    const user = req.user
    const cart = await cartService.findCartByFilter(user.username);
    const messageOptions = {
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5493329684391",
        body: `email:${user.email} \n username:${user.username} \n buy (${cart.products.map((prod)=>{
            return `- product: ${prod.name}, price:${prod.price}\n`
        })})`,
    };
    const mailOtions = {
        from: "Servidor Node",
        to: "sigrid.stokes13@ethereal.email",
        subject: `nuevo pedido de ${user.username}`,
        text:`email:${user.email} \nusername:${user.username} \nbuy(\n${cart.products.map((prod)=>{
            return `    - product: ${prod.name}, price:${prod.price}\n`
        })})`
    };
    
    await cartService.resetCart(user.username)
    try {
        await transporter.sendMail(mailOtions);
        await client.messages.create(messageOptions);
    } catch (err) {
        logger.error(err);
    }
    res.redirect('/cart')
}

export {getIndex, productForm, saveProd, addToCart, cart, cartPost}