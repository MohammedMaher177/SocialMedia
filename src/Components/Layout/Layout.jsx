

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';

export default function Layout(props) {
    return (
        <div>
            <Navbar />
            <div className='main pt-5 container'>

                <Outlet>
                </Outlet>
            </div>
            <footer>
                © 2023 My Company
            </footer>
        </div>
    );
}