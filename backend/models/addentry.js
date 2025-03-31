import mongoose from "mongoose";

let AddEntry = mongoose.Schema ({
    name:String,
    phone:String,
    email:String,
    dob:String,
    address:String,
    student:Boolean
})
let addEntry = mongoose.model("add",addEntry)

export default AddEntry