import { faker } from '@faker-js/faker'
import { json } from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import yargs from 'yargs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const args = yargs(process.argv.slice(2)).argv


const fakerData = (qty) => {
    let products = [];
    for (let i = 0; i<qty; i++){
        let title = faker.commerce.productName();
        let price = faker.commerce.price();
        let img = faker.image.image();
        products.push({title, price, img});
    };
    return products;
};



const getHome =(req, res) => {
    const user = req.user
    res.render('home', {email : user.email})
}
const getTestData = (req, res)=>{
    res.render('test', {items:fakerData(5)})
}


const login = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }else{
        res.sendFile(join(__dirname, '../views/login.html'))
    }
}
const user = (req, res) =>{
    const user = req.user;
    console.log(user);
    res.render('login-ok', {
        usuario: user.username,
        nombre: user.firstname,
        apellido: user.lastname,
        email: user.email,
    })
}


const register = (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }
    res.sendFile(join(__dirname, '../views/register.html'))
}
const logout = (req, res) => {
    const user = req.user
    req.logout(() => {
        console.log("logout complete");
        return res.render('logout', {user: user.username})
    });
}

const loginFailure = (req, res) => {
    res.render('login-error')
}

const registerFailure = (req, res) => {
    res.render('signup-error') 
}

const getInfo = (req, res)=>{
    res.render('info', {
        entryArgs : JSON.stringify(args),
        platform: process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage().rss,
        path: process.execPath,
        processId: process.pid,
        dir: process.cwd()
    })
}


export const controller = { 
    logout,
    getHome,
    getTestData,
    login, 
    register, 
    user, 
    loginFailure, 
    registerFailure, 
    getInfo
}