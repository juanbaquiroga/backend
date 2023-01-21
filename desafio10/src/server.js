import express, {json, urlencoded} from 'express'
import { db } from './db/db.js'
import { config } from "./config/config.js";
import routes from './routes/index.js'

const app = express()

app.use(json());
app.use(urlencoded({extended:true}))

app.use('/api', routes)

db.connectDb(config.dbUrl).then(() => {
    console.log(`${config.database} Database connected`);
    app.listen(3000, () => {
      console.log("server listening port 3000");
    });
}); 