import axios from "axios";
// mutation{
//     createProduct(prodData:{
//           name: "iPhone 11",
//           price: 1200,
//           img: "soyunaimagen.jpg",
//           stock: 130
//     }){_id, name, img, stock, price}
//   }
  
//   query{
//     getProducts{_id, name, price, img, stock}
//   }
  
//   query {
//     getProduct(id:"6419aec067abf50877de3122"){name, price, _id, stock, img}
//   }
  
//   mutation{
    // updateProduct(id:"6441a384215b881e1c0a0a29", updateProdData:{name: "iPhone 10",
    //     img: "soyunaimageneditada.jpg",
    //     stock: 121,
    //     price: 1201
//     } ){_id,name, img, stock, price}
//   }
  
//   mutation{
//     deleteProduct(id:"6441a384215b881e1c0a0a29"){_id,name, img, stock, price}
//   }

//======================================================================
//======================= create products ==============================
//======================================================================
console.log(`
======================================================================
======================= create products ==============================
======================================================================
`)
const createProductMutation1 = {
    query: `
    mutation{
        createProduct(prodData:{
            name: "product 1",
            price: 1200,
            img: "soylaimagen1.jpg",
            stock: 130
        }){_id, name, img, stock, price}
    }`,
};
const createProductMutation2 = {
    query: `
    mutation{
        createProduct(prodData:{
            name: "product2",
            price: 1200,
            img: "soylaimagen2.jpg",
            stock: 10
        }){_id, name, img, stock, price}
    }`,
};


const createProdMutationOptions1 = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: createProductMutation1,
};
const createProdMutationOptions2 = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: createProductMutation2,
};

const createProdMutationResponse1 = await axios(createProdMutationOptions1);
const createProdMutationResponse2 = await axios(createProdMutationOptions2);

console.log(createProdMutationResponse1.data);
console.log(createProdMutationResponse2.data);

const id = createProdMutationResponse1.data.data.createProduct._id

// ======================================================================
// ========================= read products ==============================
// ======================================================================
console.log(`
======================================================================
========================= read products ==============================
======================================================================
`)

const readProductsQuery = {
    query: `query {
        getProducts{_id, name, price, img, stock}
    }`,
};
const readProductQuery = {
    query: `query {
        getProduct(id: "${id}"){_id, name, img, stock, price}
    }`
}

const readProductsQueryOptions = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: readProductsQuery,
};
const readProductQueryOptions = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: readProductQuery,
};

const readProductsQueryResponse = await axios(readProductsQueryOptions);
const readProductQueryResponse = await axios(readProductQueryOptions);

console.log(readProductsQueryResponse.data);
console.log(readProductQueryResponse.data);

//======================================================================
//======================= update products ==============================
//======================================================================
console.log(`
======================================================================
======================= update products ==============================
======================================================================
`)

const updateProductQuery = {
    query: `
    mutation {
        updateProduct(id:${id}, updateProdData:{
            name: "producto editado",
            img: "soyunaimageneditada.jpg",
            stock: 121,
            price: 1201
        } ){_id,name, img, stock, price}
    }
    `
};

const updateProductOptions = {
    url: "http://localhost:3000/graphql",
    method: "post",
    data: updateProductQuery,
};

const updateProductResponse = await axios(updateProductOptions);

console.log(updateProductResponse.data);


// ======================================================================
// ======================= delete products ==============================
// ======================================================================
console.log(`
======================================================================
======================= delete products ==============================
======================================================================
`)

const deleteProductQuery = {
    query: `
        mutation{
                deleteProduct(id:${id}){_id,name, img, stock, price}
        }`,
};

const deleteProductOptions = {
    url: "http://localhost:3000/graphql",
    method: "POST",
    data: deleteProductQuery,
};

const deleteProductResponse = await axios(deleteProductOptions);

console.log(deleteProductResponse.data);

