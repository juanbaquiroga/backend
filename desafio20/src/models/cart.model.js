import { model, Schema } from "mongoose";

const cartSchema = new Schema({
  username: { type: String, require: true},
  products: {type: Array, require: true}
});

const Cart = model("cart", cartSchema);

export default Cart