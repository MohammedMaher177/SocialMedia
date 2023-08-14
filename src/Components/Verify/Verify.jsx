


import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

export default function Verify() {
    const { verifyToken } = useParams()
    const navigate = useNavigate()
    console.log(verifyToken);
    const confirmEmail = async () => {
        try {
            const { isActive, id } = jwtDecode(verifyToken)
        if (isActive) {
            alert("VERIFIED, Click to go to your Profile Page")
            localStorage.setItem("userId", verifyToken)
            navigate(`/users/search/${id}`, { replace: true })
        }
        } catch (error) {
            console.log(error);
        }
        

    }
    useEffect(() => {
        confirmEmail()
    })
    return (
        <h1 className='p-5 text-warning text-center'> PLEASE CHECK YOUR MAIL INBOX</h1>
    )
}
