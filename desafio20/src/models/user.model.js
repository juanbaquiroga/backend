import { model, Schema } from "mongoose";

const userSchema = Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  name: { type: String },
  address: { type: String },
  age: { type: Number },
  phone: { type: Number },
  img: { type: String }
});
const User = model("user", userSchema);

export default User