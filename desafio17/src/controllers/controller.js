import { faker } from '@faker-js/faker';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import yargs from 'yargs';
import { fork } from "child_process";
import logger from '../lib/logger.js';

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
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    const user = req.user
    res.render('home', {email : user.email})
}
const getTestData = (req, res)=>{
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    res.render('test', {items:fakerData(5)})
}


const login = (req, res) => {
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }else{
        res.sendFile(join(__dirname, '../views/login.html'))
    }
}
const user = (req, res) =>{
    logger.info(`${req.method} request from ${req.originalUrl} route`)
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
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    if (req.isAuthenticated()) {
        res.redirect('/user')
    }
    res.sendFile(join(__dirname, '../views/register.html'))
}
const logout = (req, res) => {
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    const user = req.user
    req.logout(() => {
        console.log("logout complete");
        return res.render('logout', {user: user.username})
    });
}

const loginFailure = (req, res) => {
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    res.render('login-error')
}

const registerFailure = (req, res) => {
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    res.render('signup-error') 
}

const getInfo = (req, res)=>{
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    // console.log({
    //     entryArgs : JSON.stringify(args),
    //     platform: process.platform,
    //     nodeVersion: process.version,
    //     memory: process.memoryUsage().rss,
    //     path: process.execPath,
    //     processId: process.pid,
    //     dir: process.cwd()
    // })
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
const getRandom = (req, res)=>{
    logger.info(`${req.method} request from ${req.originalUrl} route`)
    const { cant } = req.query
    const childProcess = fork("./src/child.js");
    const quantity = cant ? cant : 100000;

    childProcess.send(quantity)

    childProcess.on("message",(response)=>{
        res.json(response)
    } )
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
    getInfo,
    getRandom
}