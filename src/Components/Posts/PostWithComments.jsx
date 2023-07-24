import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDateInDays } from '../../Util/Util.js'
import { getSubPost, like, likePost, unLike } from '../../Redux/postsSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import PopUpAlert from '../PopUpAlert/PopUpAlert.jsx'



export default function PostWithComments() {
  const { id } = useParams()
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const getPostData = async () => {
    const newPost = await dispatch(getSubPost(id))
  }
  const { subPost: post, isLoading } = useSelector(({ posts }) => posts)
  const userId = useSelector(({ auth }) => auth.user._id)
  console.log(userId);
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

  useEffect(() => {
    getPostData(id)
  }, [])
  console.log(post);
  return (
    <>
      {isLoading ? <div className=' position-relative text-center w-100 vh-100'>
        <span className='d-flex align-content-center justify-content-center position-absolute top-50 start-50 translate-middle'>
          <i className="fa-solid fa-spinner fa-spin fs-1 text-primary"></i>
        </span>
      </div> : <>
        <div className='border-bottom text-start p-3'>
          <div className='d-flex justify-content-between'>
            <Link to={`/users/search/${post?.authorId?._id}`} >
              <h2 className=' text-primary clickable'>{post?.authorId?.name}<i className="fa-regular fa-address-card mx-1"></i></h2>
            </Link>
            <button disabled className='btn btn-primary'>Follow<div className='text-white-50'>not avilable now</div></button>
          </div>
          <h4>{post?.title}</h4>
          <div className='d-flex'>

            <i className="fa-regular fa-user"></i>
            <span className=''>{getDateInDays(post?.createdAt)} Dayes Ago</span>
          </div>

          <p>{post?.content}</p>
          <div>
            <button className='btn me-2 p-0' onClick={() => getLikePost(post._id)}>
              {post.postLikes?.includes(userId) ? <i className="fa-regular fa-heart btn btn-primary">
                <span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span>
              </i> :
                <i className="fa-regular fa-heart btn btn-outline-primary">
                  <span className='badge badge-muted text-primary'>{post.postLikes?.length}</span>
                </i>}
            </button>
            <Link to={`/posts/search/${post._id}`} >
              <button className='btn btn-outline-primary'>
                <i className="fa-regular fa-comment"></i>
                <span className=' badge badge-secondary text-primary'>{post?.postComments?.length}</span>
              </button>
            </Link>

            <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-share"></i></button>
          </div>
        </div>

        <div className=' text-start'>
          {post?.postComments?.map(comment => <div key={comment._id}>
            <Link to={`/users/search/${comment.user_id._id}`} >
              <h5 className=' text-primary clickable'>{comment.user_id.name}<i className="fa-regular fa-address-card mx-1"></i>
                {comment.user_id._id == post?.authorId._id && <span className=' badge badge-secondary text-decoration-none text-secondary fs-6'>Author</span>}
              </h5>
            </Link>
            <h6>{comment.content}</h6>
          </div>)}
        </div>
        <button className='btn btn-outline-primary d-none'>
          <PopUpAlert show={show} setShow={setShow} />
        </button>
      </>}
    </>
  )
}
