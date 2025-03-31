import React ,{useState} from "react";


const Page404 = ()=>{

    return(
        <div className="bg-black vw-100 vh-100  p-5 d-flex flex-column justify-cantent-center align-items-center gap-2">
            <span className="page404 d-flex align-items-center fs-2">404 page not Found </span>
            <p className="text-center border border-secondary text-light px-2 py-1 fs-3">server error</p>
        </div>
    )
}

export default Page404