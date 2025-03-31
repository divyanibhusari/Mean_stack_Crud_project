import mongoose from "mongoose";

let adminSchema = mongoose.Schema({
    email: String,
    password: String,
    token: String
})

let adminModel = mongoose.model("admin", adminSchema)

export default adminModel