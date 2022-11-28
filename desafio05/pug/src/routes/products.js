import {Router} from "express"

const router = Router()


const products = [
    {
        title: "iphone 12",
        price: "600",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-unselect-gallery-2-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1662129021500",
        id: 1
    },
    {
        title: "iphone 13",
        price: "700",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-storage-select-202207-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1655405993391",
        id: 2
    },
    {
        title: "iphone 14",
        price: "800",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-gallery-2-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660744858995",
        id: 3
    },
    {
        title: "iphone 14 pro max",
        price: "1100",
        img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
        id: 4
    }
]

router
    .route('/products')
    .get((req, res)=>{
        let hasAny 
        products.length ? hasAny = true : hasAny = false
        res.render("products", { products, hasAny: hasAny });
    })
    .post((req, res)=>{
        const {title, price, img} = req.body
        const newId = products[products.length -1].id + 1;
        const newProduct = {id: newId, title, price, img}
        products.push(newProduct)
        
        res.redirect("/products")
    })

router
    .route('/')
    .get((req, res)=>{
        res.render("form")

    })

export default router