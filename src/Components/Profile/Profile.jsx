


import React, { useEffect } from 'react'
import profilePic from './profile_pictur.png'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../Redux/profileSlicce.js';
import DisplayPosts from '../Posts/DisplayPosts.jsx';





export default function Profile() {
    const { id } = useParams()
    const dispatch = useDispatch()

    

    const getProfile = async () => {
        const user = await dispatch(getProfileData(id))
    }

    const {user, posts} = useSelector(({profile}) => profile)
    useEffect(()=>{
        getProfile()
    }, [])
    return (
        <>
            <div className="row position-relative">
                <div className="col-md-4">
                    <img src={profilePic} alt="" />
                </div>
                <div className="col-md-8 text-start py-5 mb-5">
                    <h2>Name :{user?.name}</h2>
                    <h3>Email :{user?.email}</h3>
                </div>
                <div className="col-md-8 mx-auto border rounded-3 mb-4">
                {posts?.map(post => <DisplayPosts post={post}  key={post._id}/>)}
                </div>
                <div className="col-md-9 mx-auto position-absolute top-100 start-0 end-0">
                    <div className='d-flex justify-content-between'>
                        <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-user-plus"></i></button>
                        <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-check"></i></button>
                        <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-user-lock"></i></button>
                        <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-regular fa-message"></i></button>
                    </div>
                </div>
            </div>




        </>
    )
}
