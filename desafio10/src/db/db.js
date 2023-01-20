import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import mongoose from "mongoose";
import { config } from "../config/config.js";
import {firebaseConfig} from "./keys.js";

let connectDb;

const connectMongo = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const connectFirebase = async (url) => {
    getFirestore(initializeApp(firebaseConfig))
};

if (config.database === "MONGO") {
  connectDb = connectMongo;
} else {
  connectDb = connectFirebase;
}

export const db = { connectDb };