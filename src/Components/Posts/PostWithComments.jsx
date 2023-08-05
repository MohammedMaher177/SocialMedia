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
  // console.log(id);
  const getPostData = async () => {
    const newPost = await dispatch(getSubPost(id))
  }
  const { subPost: post, isLoading } = useSelector(({ posts }) => posts)
  console.log(post);
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

  const addFriend = (authorId, userId) => {

    console.log({ authorId, userId });
  }

  useEffect(() => {
    getPostData(id)
  }, [])
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
            {/* <button disabled className='btn btn-primary'>Follow<div className='text-white-50'>not avilable now</div></button> */}
            {post.authorId?._id !== userId && <button className='btn btn-primary' onClick={() => addFriend(post.authorId?._id, userId)}>Add Friend<i className="fa-solid fa-user-plus mx-2"></i></button>}
          </div>
          <h4>{post?.title}</h4>
          <div className='d-flex'>

            <i className="fa-regular fa-user"></i>
            <span className=''>{getDateInDays(post?.createdAt)} Dayes Ago</span>
          </div>

          <p>{post?.content}</p>
          <div>
          {!post.postLikes?.includes(userId) ?
            <button className='btn btn-outline-primary' onClick={() => getLikePost(post?._id)}><i className="fa-solid fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button> :
            <button className='btn btn-primary' onClick={() => getLikePost(post?._id)}><i className="fa-regular fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button>}
            <Link to={`/posts/search/${post?._id}`} >
              <button className='btn btn-outline-primary'>
                <i className="fa-regular fa-comment"></i>
                <span className=' badge badge-secondary text-primary'>{post?.postComments?.length}</span>
              </button>
            </Link>

            <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-share"></i></button>
          </div>
        </div>




        <div>
          {!post.postLikes?.includes(userId) ?
            <button className='btn btn-outline-primary' onClick={() => getLikePost(post?._id)}><i className="fa-solid fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button> :
            <button className='btn btn-primary' onClick={() => getLikePost(post?._id)}><i className="fa-regular fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button>}
          <button className='btn btn-outline-primary mx-2'><i className="fa-regular fa-comment"></i></button>
          <button className='btn btn-outline-primary'><i className="fa-solid fa-share"></i></button>
        </div>


        <div className=' text-start'>
          {post?.postComments?.map(comment => <div key={comment?._id}>
            <h4>{comment.content}</h4>
          </div>)}
        </div>
        <button className='btn btn-outline-primary d-none'>
          <PopUpAlert show={show} setShow={setShow} />
        </button>
      </>}
    </>
  );
}
