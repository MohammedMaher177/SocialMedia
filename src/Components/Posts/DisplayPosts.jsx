import React, { useState } from 'react'
import { getDateInDays } from '../../Util/Util.js'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { unLike, likePost, like, deletePost } from '../../Redux/postsSlice.js'
import PopUpAlert from '../PopUpAlert/PopUpAlert.jsx'
import DeletePostAlert from '../PopUpAlert/DeletePostAlert.jsx'
import UpdatePostAlert from '../PopUpAlert/UpdatePostAlert.js'


export default function DisplayPosts({ post }) {
    // console.log(post);
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const { id: userId, token } = useSelector(({ auth }) => auth)
    const getLikePost = async (postId) => {
        if (!userId) {
            setShow(true)
            return
        }
        const value = {
            headers: {
                authorizathion: token
            },
            postId
        }
        const { payload } = await dispatch(likePost(value))
        if (payload.param === "Like") {
            dispatch(like({ userId, postId }))
        } else if (payload.param === "Un Like") {
            dispatch(unLike({ userId, postId }))
        }
    }

    return (
        <>
            <div className='border-bottom text-start p-3'>
                <div className='d-flex justify-content-between'>
                    <Link to={`/users/search/${post.authorId._id}`} >
                        <h2 className=' text-primary clickable'>{post?.authorId?.name}<i className="fa-regular fa-address-card mx-1"></i></h2>
                    </Link>
                    {(post.authorId._id !== userId && post.authorId !== userId )?
                        <button className='btn btn-primary'>Add Friend<i className="fa-solid fa-user-plus mx-2"></i></button> :
                        <h6><div className="dropdown open">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                    <span className="badge bg-secondary">Author</span>
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            <div className="dropdown-menu p-0" aria-labelledby="triggerId">
                                <button className="btn btn-outline-warning w-100 mb-2" href="#" onClick={() => setShowUpdate(true)}>Update</button>
                                <button className="btn btn-outline-danger w-100" href="#" onClick={() => setShowDelete(true)}>Delete</button>
                            </div>
                        </div></h6>}

                </div>
                <h4>{post.title}</h4>
                <div className='d-flex'>
                    <i className="fa-regular fa-user"></i>
                    <span className=''>{getDateInDays(post.createdAt)} Dayes Ago</span>
                </div>

                <p>{post.content}</p>
                <div>
                {!post.postLikes?.includes(userId) ?
            <button className='btn btn-outline-primary' onClick={() => getLikePost(post?._id)}><i className="fa-solid fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button> :
            <button className='btn btn-primary' onClick={() => getLikePost(post?._id)}><i className="fa-regular fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button>}
                    <Link to={`/posts/search/${post._id}`} >
                        <button className='btn btn-outline-primary'><i className="fa-regular fa-comment"></i><span className=' badge badge-secondary text-primary'>{post.postComments.length}</span></button>
                    </Link>
                    <button className='btn btn-outline-primary d-none'>
                        <PopUpAlert show={show} setShow={setShow} />
                    </button>
                    <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-share"></i></button>
                </div>
            </div>
            <button className='d-none'>
                <DeletePostAlert show={showDelete} setShow={setShowDelete} id={post._id}/>
            </button>
            <button className='d-none'>
                <UpdatePostAlert show={showUpdate} setShow={setShowUpdate} post={post}/>
            </button>

        </>
    )
}