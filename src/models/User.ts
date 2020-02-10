import { Schema, model } from 'mongoose'

const userSchema =  new Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    }
})

export default model('User', userSchema)