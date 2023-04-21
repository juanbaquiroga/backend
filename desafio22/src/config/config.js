import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  mode: process.env.MODE,
  dbUrl: process.env.DB_URL,
  database: process.env.DATABASE,
  corsOrigin: process.env.CORS_ORIGINS.split(","),
};

export default config;