import { model, Schema } from "mongoose";

const productsSchema = new Schema({
  stock: { type: Number, required: true },
  price: {type: Number, required: true},
  title: { type: String, required: true },
  code: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: String, required: true }
});

export const Products = model("Products", productsSchema);