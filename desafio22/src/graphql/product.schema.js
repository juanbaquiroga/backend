import { buildSchema } from "graphql";


const schema = buildSchema(`
    input ProductInput {
        name: String,
        img: String,
        price: Int,
        stock: Int
    }
    type Product {
        name: String,
        img: String,
        price: Int,
        stock: Int,
        _id: ID!
    }
    type Query {
        getProduct(id: ID!): Product,
        getProducts: [Product]
    }
    type Mutation {
        createProduct(prodData: ProductInput): Product,
        updateProduct(id: ID!, updateProdData: ProductInput): Product,
        deleteProduct(id: ID!): Product
    }
`);

export default schema;