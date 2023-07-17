

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../Redux/postsSlice.js'
import CreatePost from './CreatePost.jsx'
import DisplayPosts from './DisplayPosts.jsx'
import Loading from '../Loading/Loading.jsx'




export default function Posts() {
  const dispatch = useDispatch()
  const getAllPosts = async () => {
    let posts = await dispatch(getPosts())
  }

  let { posts, isLoading } = useSelector(state => state.posts)
  useEffect(() => {
    getAllPosts()
  }, [])

  return (<>
    <CreatePost />
    {isLoading ? <Loading /> : posts?.map(post => <DisplayPosts post={post} key={post._id} />)}


  </>
  )
}
