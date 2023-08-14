


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import VerifyAlert from '../PopUpAlert/VerifyAlert.jsx';

export default function Verify() {
    const { verifyToken } = useParams()
    const [show, setshow] = useState(false)
    const [userId, setUserId] = useState(false)
    
    const confirmEmail = async () => {
        try {
            const { isActive, id } = jwtDecode(verifyToken)
            setUserId(id)
            if (isActive) {
                localStorage.setItem("userId", verifyToken)
                setshow(true)
            }
        } catch (error) {
            console.log(error);
        }


    }
    useEffect(() => {
        confirmEmail()
    })
    return (
        <>
        <h1 className='p-5 text-warning text-center'> PLEASE CHECK YOUR MAIL INBOX</h1>
        <VerifyAlert show={show} setShow={setshow} id={userId}/>
        </>
    )
}
