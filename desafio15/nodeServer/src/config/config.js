import dotenv from "dotenv";
dotenv.config();

const config = {
  clienId: process.env.CLIENT_ID,
  clienSecret: process.env.CLIENT_SECRET,
  sqlHost: process.env.SQL_HOST,
  mongooseUrl: process.env.MONGOOSE_URL,
};
console.log(config);


export default config;
