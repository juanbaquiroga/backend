import sqliteConfig from '../db/sqlite.js';
import knex from 'knex';
const database = knex(sqliteConfig)

const createCarTable = async ()=>{
    try{
        await database.schema.dropTableIfExists('messages');
        await database.schema.createTable('messages', (messagesTable) =>{
            messagesTable.increments('id').primary();
            messagesTable.string('email', 70).notNullable;
            messagesTable.string('message', 100000).notNullable;
            messagesTable.dateTime('date').notNullable;
        });

        console.log('messages table created')
        
        database.destroy()
    }catch(err){
        console.log(err)

        database.destroy
    }
}


createCarTable()