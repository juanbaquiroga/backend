import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
  dbUrl: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  keyFirebase: process.env.FIREBASE_KEY
};