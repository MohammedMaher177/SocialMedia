import React from 'react'
import { getDateInDays, toPost } from '../../Util/Util.js'
import { Link } from 'react-router-dom'



export default function DisplayPosts({ post }) {

    console.log(post);

    return (
        <>

            <div className='border-bottom text-start p-3'>
                <div className='d-flex justify-content-between'>
                    <Link to={`/users/search/${post.authorId._id}`} >
                        <h2 className=' text-primary clickable'>{post?.authorId?.name}<i className="fa-regular fa-address-card mx-1"></i></h2>
                    </Link>
                    <button disabled className='btn btn-primary'>Follow<div className='text-white-50'>not avilable now</div></button>
                </div>
                <h4>{post.title}</h4>
                <div className='d-flex'>

                    <i className="fa-regular fa-user"></i>
                    <span className=''>{getDateInDays(post.createdAt)} Dayes Ago</span>
                </div>

                <p>{post.content}</p>
                <div>
                    <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-regular fa-heart"></i></button>
                    <Link to={`/posts/search/${post._id}`} >
                        <button className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-regular fa-comment"></i></button>
                    </Link>
                    <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-share"></i></button>
                </div>
            </div>


        </>
    )
}
