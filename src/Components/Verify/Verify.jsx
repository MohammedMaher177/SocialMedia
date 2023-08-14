


import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../Util/Util.js';

export default function Verify() {
    const {verifyToken} = useParams()
    // console.log(verifyToken);
    const confirmEmail = async ()=> {
       const {data} =  await axios.get(`${baseUrl}/users/verifyemail/${verifyToken}`)
       console.log(data);
       if(data.message == "success"){
        localStorage.setItem("userId", data.token)
       }
    }
    useEffect(()=>{
        confirmEmail()
    })
  return (
    <div>Verify</div>
  )
}
