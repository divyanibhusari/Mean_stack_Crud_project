import React, { useRef, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {

    let navigate = useNavigate()

    let [showPassword, setShowPassword] = useState(false)

    let [isSubmited, setIsSubmited] = useState({
        status: false,
        response: false,
        message: "some message !"
    })

    let [loginData, setLoginData] = useState({
        email: "", password: ""
    })

    let handelChange = (e) => {
        let { name, value } = e.target
        setLoginData(prev => {
            return { ...prev, [name]: value }
        })
    }

    let handelLoginFormSubmit = async (e) => {
        e.preventDefault()

        try {

            let result = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_ADDRESS}/admin/login`,
                data: loginData
            })

            console.log(result)

            if (result.status == 202) {
                setIsSubmited(() => {
                    return {
                        status: true,
                        response: true,
                        message: result.data.message
                    }
                })

                setTimeout(() => {
                    setIsSubmited(() => {
                        return {
                            status: false,
                            response: true,
                            message: result.data.message
                        }
                    })
                }, 2000)
            }

            // save token in localstorage

            console.log(result.data.token)

            localStorage.setItem("token", result.data.token)

            console.log("this is from localstorage : ", localStorage.getItem("token"))

            navigate("/dashboard")

        }
        catch (err) {
            console.log("unable to submit the form ", err)
            setIsSubmited(() => {
                return {
                    status: true,
                    response: false,
                    message: err.response.data.message
                }
            })

            setTimeout(() => {
                setIsSubmited(() => {
                    return {
                        status: false,
                        response: false,
                        message: err.response.data.message
                    }
                })
            }, 2000)
        }
    }

    let handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/Dashboard")
    }
    return (
        <>
            <div className='login-page'>
                <button className="btn btn-warning px-1" onClick={handleLogout}>LogIn</button>
                <div className='main-login-form'>
                    <h2 className='text-center text-light'>Login</h2>
                    <form onSubmit={handelLoginFormSubmit} className='login-form'>
                        <div className='login-form-input'>
                            <label htmlFor="">User Email</label>
                            <input onChange={handelChange} className='' type="email" name='email' value={loginData.email} />
                        </div>
                        <div className='login-form-input'>
                            <label htmlFor="">User Password</label>
                            <input onChange={handelChange} id='password' className='' type={showPassword ? `text` : 'password'} name='password' value={loginData.password} />
                        </div>
                        <div className='d-flex justify-content-center gap-5'>
                            <button type='button' onClick={() => {
                                setLoginData(() => { return { email: "", password: "" } })
                            }} className='btn btn-danger'>Reset</button>
                            <button onClick={() => { setShowPassword(!showPassword) }} type='button' className='btn btn-dark'>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <button type='submit' className='btn btn-success'>
                                login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
           

            {
                isSubmited.status ?
                    <span
                        id='alert'
                        className={`alert ${isSubmited.response ? 'alert-success' : 'alert-danger'}`}
                    >
                        {isSubmited.message} !
                    </span> : null
            }

        </>
    )
}
export default LoginPage