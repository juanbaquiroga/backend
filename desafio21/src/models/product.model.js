import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {type: String, require: true, max: 100},
  price: {type: Number, require: true},
  img: {type: String, require: true},
  stock: {type: Number, require: true}
});

const Product = model("product", productSchema);

export default Product