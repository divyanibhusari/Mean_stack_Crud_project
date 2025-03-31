import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import LoginPage from "./components/pages/loginpage.jsx"
import Dashboard from "./components/pages/dashboard.jsx"
import Page404 from "./components/pages/page404.jsx"

import "./components/styles/style.scss"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* loginpage */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* 404 page */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
