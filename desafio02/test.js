const Contenedor = require('./contenedor')

const item1 = {
    title: 'iphone 12',
    price: '600',
    img:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-unselect-gallery-2-202207?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1662129021500'
}
const item2 = {
    title: 'iphone 13',
    price: '700',
    img:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-storage-select-202207-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1655405993391'
}
const item3 = {
    title: 'iphone 14',
    price: '800',
    img:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-gallery-2-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660744858995'
}
const item4 = {
    title: 'iphone 14 pro max',
    price: '1100',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896'
}


const contenedor = new Contenedor('productos.txt')

const test = async () => {

    let get1 = await contenedor.getAll()
    console.log(get1)

    let save1 = await contenedor.save(item1)
    console.log(save1);
    let save2 = await contenedor.save(item2)
    console.log(save2);
    let save3 = await contenedor.save(item3)
    console.log(save3);
    let save4 = await contenedor.save(item4)
    console.log(save4);

    let get2 = await contenedor.getAll()
    console.log(get2)

    let getProduct = await contenedor.getById(1)
    console.log(getProduct)

    let getProduct2 = await contenedor.getById(10)
    console.log(getProduct2)

    await contenedor.deleteById(1)
    let deleteProduct = await contenedor.getAll()
    console.log(deleteProduct)

    await contenedor.deleteAll()
    let deleteTxt = await contenedor.getAll()
    console.log(deleteTxt)
}
test()