

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../Redux/postsSlice.js'
import CreatePost from './CreatePost.jsx'
import DisplayPosts from './DisplayPosts.jsx'




export default function Posts() {
  const dispatch = useDispatch()
  const getAllPosts = async () => {
    let posts = await dispatch(getPosts())
    console.log(posts);
  }

  let { posts, isLoading } = useSelector(state => state.posts)
  useEffect(() => {
    getAllPosts()
  }, [])

  return (<>
    <CreatePost />
    {isLoading ? <div className=' position-relative text-center w-100 vh-100'>
        <span className='d-flex align-content-center justify-content-center position-absolute top-50 start-50 translate-middle'>
          <i className="fa-solid fa-spinner fa-spin fs-1 text-primary"></i>
        </span>
      </div>  : posts?.map(post => <DisplayPosts post={post} key={post._id} />)}


  </>
  )
}
