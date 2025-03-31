import express from "express"

import { getHome, adminLogin, getDashboard, getPost, AddEntry } from "../controllers/controller.js"

import authAdmin from "../auth/authAdmin.js"

let router = express()

router.get("/", getHome)

router.post("/", getPost)

router.post("/admin/login", adminLogin)

router.get("/Dashboard", authAdmin, getDashboard)

router.get("/addEntry", authAdmin, AddEntry)


export default router