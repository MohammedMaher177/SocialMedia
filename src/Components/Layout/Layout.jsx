

import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../Redux/authSlice.js';






export default function Layout(props) {
    const dispatch = useDispatch()
    const { user } = useSelector(({ auth }) => auth)
    const getUser = async () => {
       await dispatch(getUserData())
    }

   
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div>
            <Navbar />
            <div className='main py-5 container'>
            {!user._id && <h2>To Join our website please <Link to={`/signup`} className=' text-decoration-none'>Register now</Link> or <Link to={`/login`} className=' text-decoration-none'>Log in</Link></h2>}
                <Outlet>
                </Outlet>
            </div>
            <Footer />
        </div>
    );
}