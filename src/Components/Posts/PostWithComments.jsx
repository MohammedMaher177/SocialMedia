import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDateInDays } from '../../Util/Util.js'
import { getSubPost } from '../../Redux/postsSlice.js'
import { useDispatch, useSelector } from 'react-redux'



export default function PostWithComments() {
  const { id } = useParams()
  const dispatch = useDispatch()
  // console.log(id);
  const getPostData = async () => {
    const newPost = await dispatch(getSubPost(id))
  }
  const { subPost: post, isLoading } = useSelector(({ posts }) => posts)
  // console.log(post);
  // console.log(isLoading);
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
          <button disabled className='btn btn-primary'>Follow<div className='text-white-50'>not avilable now</div></button>
        </div>
        <h4>{post?.title}</h4>
        <div className='d-flex'>

          <i className="fa-regular fa-user"></i>
          <span className=''>{getDateInDays(post?.createdAt)} Dayes Ago</span>
        </div>

        <p>{post?.content}</p>
        <div>
          <button className='btn btn-outline-primary'><i className="fa-regular fa-heart"></i></button>
          <button className='btn btn-outline-primary mx-2'><i className="fa-regular fa-comment"></i></button>
          <button className='btn btn-outline-primary'><i className="fa-solid fa-share"></i></button>
        </div>
      </div>

        <div className=' text-start'>
          {post?.postComments?.map(comment => <div key={comment._id}>
            <h4>{comment.content}</h4>
          </div>)}
        </div>
      </>}
    </>
  )
}
