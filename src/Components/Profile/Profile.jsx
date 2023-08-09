import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';


import React, { useEffect, useState } from 'react'
import profilePic from './profile_pictur.png'
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../Redux/profileSlicce.js';
import DisplayPosts from '../Posts/DisplayPosts.jsx';
import Loading from '../Loading/Loading.jsx';
import FirendRequest from './FirendRequest.jsx';





export default function Profile() {
    const { id } = useParams()
    const [requests, setRequests] = useState(false)
    const dispatch = useDispatch()



    const getProfile = async () => {
        const { payload } = await dispatch(getProfileData(id))
        // console.log(payload);
    }
    const location = useLocation()


    const { user, isLoading, posts : userPosts } = useSelector(({ profile }) => profile)
    console.log(user);
    const { posts } = useSelector(({ posts }) => posts)
    const { id: userId } = useSelector(({ auth }) => auth)
    // console.log({"paarm":id, "auth":userId});
    useEffect(() => {
        getProfile()
    }, [location])
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
                {id == userId && <FloatButton.Group shape="circle" style={{ position: "initial", display: "flex", justifyContent: "flex-start", gap: "50px" }}>
                    <FloatButton tooltip={<div>Posts</div>} badge={{ count: userPosts?.length, color: 'blue' }} onClick={() => setRequests(false)} />
                    <FloatButton tooltip={<div>Firend Request</div>} badge={{ count: user?.firendRequest?.length }} onClick={() => setRequests(true)} />
                </FloatButton.Group>}



                {!requests ? <div className="col-md-8 mx-auto border rounded-3 mb-4">
                    {isLoading ? <Loading isLoading={isLoading} /> : !posts.length ? <span className=' text-warning'>No Posts To View</span> :
                        posts?.map(post => {
                            if (id == userId) {
                                return post.authorId._id == userId && <DisplayPosts post={post} key={post._id} />
                            }
                            else if (post.authorId._id == id) {
                                return <DisplayPosts post={post} key={post._id} />
                            }


                        })}
                </div> : <FirendRequest firendRequest={user.firendRequest}/>}
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
