import express from "express"

import dotenv from "dotenv"

dotenv.config({ path: "./config.env" })

import router from "./routers/router.js"

import bodyParser from "body-parser"

import cors from "cors"

let app = express()

let port = process.env.port || 2345

let corsOption = {
    origin: "*",
    method: "*"
}

app.use(cors(corsOption))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

app.use(router)

app.listen(port, () => {

    console.log(`server is running on port :${port} || http://127.0.0.1:${port}`)

})