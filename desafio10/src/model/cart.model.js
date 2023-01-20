import { model, Schema } from "mongoose";

const cartSchema = new Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true }
});

export const Cart = model("cart", cartSchema);
