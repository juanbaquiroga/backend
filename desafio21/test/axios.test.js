import axios from "./axios.config.js";

const getProds = async () => {
    try {
        const response = await axios.get("/products", {});
        console.log("Server response:", response.data);
    } catch (err) {
        console.log(err);
    }
};
const addProd = async () => {
    try {
        const response = await axios.post("/products", {
            name:'iphone 7',
            price:550,
            stock: 6,
            img:'test.jpg'
        });
        console.log("Server response:", response.data)
    } catch (err) {
        console.log(err);
    }
};
const updateProd = async () => {
    try {
        const response = await axios.put("/products", {
            id: '6436036e7e23165521506a90',
            name:'iphone 12',
            price:50,
            stock: 60,
            img:'test2.jpg'
        });
        console.log("Server response:", response.data)
    } catch(err){
        console.log(err);
    }
}
const deleteProd = async () => {
    try {
        const response = await axios.delete("/products", {
            id: '6436036e7e23165521506a90'
        })
        console.log("Server response:", response.data)
    } catch(err){
        console.log(err);
    }
}

await getProds();
await addProd();
await getProds()
await updateProd();
await getProds();
await deleteProd();
await getProds();

