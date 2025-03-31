import { generatedToken } from "../auth/generatedToken.js"

import "../database/conn.js"

import adminModel from "../models/adminSchema.js"

let getHome = (req, res) => {

    console.log("getHome route is called !")

    res.status(200).json({ message: "This is a home page" })

}

let getPost = (req, res) => {
    console.log("post home route called !")
    console.log(req.body)
    res.status(202).json({ message: "This is a home route with post" })
}
let adminLogin = async (req, res) => {
    let responseData = {
        status: 0,
        message: ""
    }
    try {
        let { email, password } = req.body
        if (!email || !password) {
            responseData.message = "Email or password is missing !"
            responseData.status = 400
            throw (responseData.message)
        }
        let adminExists = await adminModel.findOne({ "email": email })
        if (!adminExists) {
            responseData.message = "Email doesn't exists !"
            responseData.status = 400
            throw (responseData.message)
        }
        let verifypassword = await adminModel.findOne({ "email": email, "password": password })
        if (!verifypassword) {
            responseData.message = "Email or password  doesn't match !"
            responseData.status = 401
            throw (responseData.message)
        }
        let generateToken = generatedToken(verifypassword.email)
        if (!generateToken) {
            responseData.message = "unable to login | token error try again later!"
            responseData.status = 500
            throw (responseData.message)
        }
        let result = await adminModel.updateOne({ "email": verifypassword.email }, { $set: { "token": generateToken } })
        console.log(result)

        res.status(202).json({ message: "email and password matched !", token: generateToken })
    } catch (err) {
        console.log(err)
        res.status(responseData.status).json({ message: err })
    }
}
let getDashboard = (req, res) => {
    // console.log("This is get dashboard")
    // console.log("we got user after authAdmin :", req.user)
    res.status(202).json({ message: "Welcome admin to the dashboard" })
}

let AddEntry = (req, res) => {
    res.status(200).json({ message: "This is a submit data !" })
    console.log("This is get form data succefully !")
    console.log(req.body)
   
}
export { getHome, adminLogin, getDashboard, getPost, AddEntry }