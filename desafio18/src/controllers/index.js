import { Product, Cart } from '../models/model.js';
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



const getIndex = async (req, res)=>{
    const products = await Product.find().lean();
    const user = req.user
    res.render('home', {products, username: user.username, userImg:user.img})
}
const login = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }else{
        res.render('login')
    }
}
const logout = (req, res) => {
    const user = req.user
    req.logout(() => {
        console.log("logout complete");
        return res.render('logout', {user: user.username})
    });
}
const user = (req, res) =>{
    const user = req.user;
    console.log(user);
    res.render('login-ok', {
        username: user.username,
        name: user.name,
        address: user.address,
        email: user.email,
        img: user.img,
        phone: user.phone,
        age: user.age
    })
}


const register = (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }
    res.render('register')
}

const productForm = (req, res)=>{
    res.render('product-form')
}
const saveProd = (req, res)=>{
    const {name, price, stock, img} = req.body;
    const product = new Product({ name, price, stock, img})
    logger.info(`new product created: ${product}`)
    product.save()
    res.redirect('/')
}
const addToCart = async (req, res)=>{
    const id = req.body.prodId
    const product= await Product.findById(id)
    const user = req.user.username
    try {
        await Cart.updateOne(
            {username: user},
            { $push: { products: product } }
        )
        logger.info(`product added to cart: ${product}`)
        return res.redirect('/')
    }
    catch (err) {
        logger.error(`error al añadir al carrito`)
    }
}

const cart = async (req, res) => {
    try{
        const user = req.user
        const cart = await Cart.findOne({username: user.username});
        const products = await cart.products
        res.render("cart", {products, hasAny:true, username: user.username, userImg:user.img})
    } catch (err){
        logger.error('error al traer el carrito')
    }
}

const cartPost = async (req, res) =>{
    const user = req.user
    const cart = await Cart.findOne({username: user.username});
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
    
    await Cart.updateOne(
        {username: user.username},
        {$set: {products: []}}
    )
    try {
        const info = await transporter.sendMail(mailOtions);
    } catch (err) {
        logger.error(err);
    }
    try {
        const message = await client.messages.create(messageOptions);
    } catch (err) {
        logger.error(err);
    }
    res.redirect('/cart')
}
export const controller = {getIndex, login, register, user, productForm, saveProd, addToCart, logout, cart, cartPost}