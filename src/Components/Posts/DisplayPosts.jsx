import React, { useState } from 'react'
import { getDateInDays } from '../../Util/Util.js'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { unLike, likePost, like } from '../../Redux/postsSlice.js'
import PopUpAlert from '../PopUpAlert/PopUpAlert.jsx'


export default function DisplayPosts({ post }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const userId = useSelector(({ auth }) => auth.user._id)
    const getLikePost = async (postId) => {
        if (!userId) {
            setShow(true)
            return
        }
        const { payload } = await dispatch(likePost({ postId, userId }))
        console.log(payload);
        if (payload.param === "Like") {
            dispatch(like({ userId, postId }))
            console.log("Like");
        } else if (payload.param === "Un Like") {
            dispatch(unLike({ userId, postId }))
            console.log("Un like");
        }

    }

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
                    <button className='btn me-2 p-0' onClick={() => getLikePost(post._id)}>
                        {post.postLikes.includes(userId) ? <i className="fa-regular fa-heart btn btn-primary">
                                <span className='badge badge-secondary text-dark'>{post.postLikes.length}</span>
                            </i> :
                            <i className="fa-regular fa-heart btn btn-outline-primary">
                                <span className='badge badge-muted text-primary'>{post.postLikes.length}</span>
                            </i>}
                    </button>
                    <Link to={`/posts/search/${post._id}`} >
                        <button className='btn btn-outline-primary'><i className="fa-regular fa-comment"></i><span className=' badge badge-secondary text-primary'>{post.postComments.length}</span></button>
                    </Link>
                    <button className='btn btn-outline-primary d-none'>
                        <PopUpAlert show={show} setShow={setShow} />
                    </button>
                    <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-share"></i></button>
                </div>
            </div>

        </>
    )
}
