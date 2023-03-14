import { faker } from '@faker-js/faker'
import { dirname} from "path";
import { fileURLToPath } from "url";
import yargs from 'yargs';



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

const getTestData = (req, res)=>{
    res.render('test', {items:fakerData(5)})
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
    getTestData,
    getInfo
}