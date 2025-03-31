import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Data from "../personal.js";
const Dashboard = () => {
    let [formData, setformData] = useState({
        name: "",
        phone: "",
        email: "",
        dob: "",
        address: "",
        student: ""

    })
    let [data, setData] = useState([])
    let [name, setName] = useState('')
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [dob, setDob] = useState('')
    let [address, setAddress] = useState('')
    let [student, setStudent] = useState('')
    let [id, setId] = useState('')
    let [isupdate, setUpdate] = useState(false)

    useEffect(() => {
        setData(Data)
    }, [])

    let navigate = useNavigate()
    useEffect(() => {
        validateUser()
    })
    let validateUser = async () => {
        try {

            let result = await axios({
                method: "GET",
                url: `${import.meta.env.VITE_API_ADDRESS}/Dashboard`,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(result)
        } catch (err) {
            console.log("you are not valid for dashboard !")
            console.log(err)
        }
    }
    let handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    // let handleChange = (e) => {
    //     let { name, value } = e.target
    //     setformData(prev => {
    //         return { ...prev, [name]: value }
    //     })
    // }
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await axios({
                method: "GET",
                url: `${import.meta.env.VITE_API_ADDRESS}/addEntry`,
                data: formData,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(result)
        } catch (err) {
            console.log("unable to submit the data to backend")
            console.log(err)
        }
    }
    let handleEdit = (id) => {
        let dt = data.filter(item => item.id === id);
        if (dt !== undefined) {
            setUpdate(true)
            setId(id)
            setName(dt[0].name)
            setPhone(dt[0].phone)
            setEmail(dt[0].email)
            setDob(dt[0].dob)
            setAddress(dt[0].address)

        }

    }
    let handleDelete = (id) => {
        if (id > 0) {
            if (window.confirm("Are you confirm delete the data")) {
                let dt = data.filter(item => item.id !== id)
                setData(dt)
            }
        }

    }


    let handleSave = (e) => {
        let error = ''
        if (name === '')
            error += 'first name is required ,'

        if (name >= 11 )
            error += 'phone is required , '

        if (name === '')
            error += 'email is required ,'

        if (name === '')
            error += 'dob is required ,'

        if (name === '')
            error += 'address is required '

        if (error === '') {


            e.preventDefault()
            let dt = [...data]
            let newObject = {
                id: Data.length + 1,
                name: name,
                phone: phone,
                email: email,
                dob: dob,
                address: address,
                student: student
            }
            dt.push(newObject)
            setData(dt)

           

        }else{
            alert(error)
        }
    }

    let handleUpdate = () => {
        let index = data.map((item) => {
            return item.id
        }).indexOf(id)
        let dt = [...data]
        dt[index].name = name
        dt[index].phone = phone
        dt[index].email = email
        dt[index].dob = dob
        dt[index].address = address

        setData(dt)
        handleReset()
    }

    let handleReset = () => {
        setId(id)
        setName('')
        setPhone('')
        setEmail('')
        setDob('')
        setAddress('')
        setUpdate(false)
    }
    return (
        <>


            <nav className="navbar p-2  ">
                <h1 className="taxt-warning px-2">welcome to dashboard</h1>
                <button className="btn btn-warning " onClick={handleLogout}>Logout</button>
            </nav>


            <div className="form-page  p-5 d-flex justify-content-center align-items-center gap-2 flex-column ">
                <h3 className="text-light p-3">Add Entry Form </h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className="row text-center">
                        <div className="col-4 form d-flex flex-column gap-2">
                            <input className="form-control" onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter the name" name="name" value={name} />
                        </div>
                        <div className="col-4  form d-flex flex-column gap-2">
                            <input className="form-control" onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Enter the phone" name="phone" value={phone} />
                        </div>
                        <div className="col-4 form d-flex flex-column gap-2">
                            <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter the email" name="email" value={email} />
                        </div>
                        <div className="col-4 pt-3 form d-flex flex-column gap-2">
                            <input className="form-control" onChange={(e) => setDob(e.target.value)} type="dob" placeholder="Enter the dob" name="dob" value={dob} />
                        </div>
                        <div className="col-4 pt-3 form d-flex flex-column gap-2">
                            <input className="form-control" onChange={(e) => setAddress(e.target.value)} type="address" placeholder="Enter the address" name="address" value={address} />
                        </div>
                        <div className="col-4 pt-3 form d-flex justify-content-center align-items-center gap-2">
                            <label htmlFor="" className="text-light fs-3"> Student </label><input onChange={(e) => setStudent(e.target.value)} className="text-danger" type="checkbox" name="student" value={student} />

                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center align-items-center py-4">
                        {
                            !isupdate ?
                                <button className="btn btn-success" onClick={(e) => handleSave(e)}>Submit </button>
                                :
                                <button className="btn btn-success" onClick={() => handleUpdate()}>Update </button>
                        }
                        <button className="btn btn-danger" onClick={() => handleReset()}>Reset</button>


                    </div>
                </form>
            </div>
            <div className=" py-3">
                <table class="table table-bordered border-black text-center table-hover">
                    <thead>
                        <tr className="p-2">
                            <th>Sr. No</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>Student Data</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.address}</td>
                                        <td>{item.student}</td>
                                        <td className="d-flex gap-1 text-center">
                                            <button onClick={() => handleEdit(item.id)} className="btn text-center bg-danger">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="btn text-center bg-primary">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )

}

export default Dashboard
