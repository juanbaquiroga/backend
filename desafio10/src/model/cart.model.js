import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    timestamp: { type: Schema.Types.String, required: true },
    products: {type: Schema.Types.Array, required: true}
});

export const Cart = model("cart", cartSchema);
    