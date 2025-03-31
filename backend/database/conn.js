import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config({path:"./config.env"})

async function conn() {

    try{
        let result = await mongoose.connect(process.env.MONGOOSE_STRING)
        console.log("connection with database successfull !")

    }catch(err){
        console.log("unable to connect with database !",err)
    }
}

conn()