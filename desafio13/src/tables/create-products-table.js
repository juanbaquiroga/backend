import knex from "knex";
import config from '../db/mysql.js'

const database = knex(config)

const createCarTable = async ()=>{
    try{
        await database.schema.dropTableIfExists('products');
        await database.schema.createTable('products', (productsTable) =>{
            productsTable.increments('id').primary();
            productsTable.string('title', 50).notNullable;
            productsTable.string('img', 10000).notNullable;
            productsTable.integer('price').notNullable;
        });

        console.log('products table created')
        
        database.destroy()
    }catch(err){
        console.log(err)

        database.destroy
    }
}


createCarTable()