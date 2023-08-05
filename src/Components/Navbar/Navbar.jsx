


import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/authSlice.js';
import fav from './favicon.png'
export default function Navbar() {

    const { user } = useSelector(({ auth }) => auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(user);

    const signout = ()=>{
        dispatch(logout())
        navigate("/")
    }
    // console.log(id);


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={fav} alt="" style={{width:"45px"}}/> Social Media App</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="./posts">posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="./movies">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="./users">Users</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user._id ? <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user?.name}
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to={`/users/search/${user._id}`}>Profile</Link></li>
                                <li><Link className="dropdown-item" to="">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" onClick={signout}>LogOut</Link></li>
                            </ul>
                        </li> : <>
                            <li className="nav-item">
                                <Link className="nav-link" to="./login">log in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="./signup">Register</Link>
                            </li>
                        </>}

                        
                        
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    )
}
