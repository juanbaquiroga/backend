import { Router } from 'express';
import { faker } from '@faker-js/faker'


const router = Router()

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



router.get('/',(req, res) => {
    const user =req.session.user
    res.render('home', {user})
})
router.get('/api/productos-test', (req,res)=>{
    res.render('test', {items:fakerData(5)})
})

export default router;