

import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../Redux/authSlice.js';
import { getPosts } from '../../Redux/postsSlice.js';

import styles from "./Layout.module.css"




export default function Layout(props) {

    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useDispatch()
    const { user } = useSelector(({ auth }) => auth)
    const getUser = async () => {
        await dispatch(getUserData())
        await dispatch(getPosts())
    }


    useEffect(() => {
        getUser()
    }, [])
    return (
        <div>
            <Navbar />
            <div className='main py-5 container-fluid'>
                {!user._id &&(!currentPath.includes("signup") && !currentPath.includes("login")) && <h3 className={styles.bdg}>To Join our website please
                    <Link to={`/signup`} className=' text-decoration-none'>Register now</Link> or
                    <Link to={`/login`} className=' text-decoration-none'>Log in</Link>
                </h3>}
                <Outlet>
                </Outlet>
            </div>
            <Footer />
        </div>
    );
}