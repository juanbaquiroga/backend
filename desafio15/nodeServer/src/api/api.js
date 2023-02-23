import knex from "knex";



class ApiProducts {
    constructor(config, table){
        this.database = knex(config);
        this.table = table;
    }
    selectAll = async () => {
        try {
            const productsDB = await this.database.from(this.table).select("*");
            
            return(productsDB)

        } catch (err) {
            console.log(err);
            this.database.destroy();
        }
    };

    insertProduct = async (product) => {
        try {
            await this.database(this.table).insert(product)

        } catch (err) {
            console.log(err);
            this.database.destroy();
        }
    };
}
export class ApiMessages {
    constructor(config, table){
        this.database = knex(config);
        this.table = table;
    }
    selectAll = async () => {
        try {
            const messagesDB = await this.database.from(this.table).select("*");
            
            return(messagesDB)

        } catch (err) {
            console.log(err);
            this.database.destroy();
        }
    };
    insertMessage = async (message) => {
        try {
            await this.database(this.table).insert(message)

        } catch (err) {
            console.log(err);
            this.database.destroy();
        }
    };
}


export default ApiProducts