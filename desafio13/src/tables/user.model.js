import {model, Schema} from 'mongoose'


const userSchema  = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String }
})

export const User = model('user', userSchema)