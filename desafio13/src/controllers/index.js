import { faker } from '@faker-js/faker'
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



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



export const controller = { logout, getHome, getTestData,login, register, user, loginFailure, registerFailure}