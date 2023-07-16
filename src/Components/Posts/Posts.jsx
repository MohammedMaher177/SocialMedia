

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../Redux/postsSlice.js'
import CreatePost from './CreatePost.jsx'
import { Link, useNavigate } from 'react-router-dom'
import DisplayPosts from './DisplayPosts.jsx'




export default function Posts() {
  const dispatch = useDispatch()
  const getAllPosts = async () => {
    let posts = await dispatch(getPosts())
  }
  const navigate = useNavigate()
  let { posts } = useSelector(state => state.posts)
  useEffect(() => {
    getAllPosts()
  })
  // function getDateInDays(createdAt) {
  //   const diff = new Date(Date.now()).getTime() - new Date(createdAt).getTime();
  //   return Math.floor(diff / 1000 / 3600 / 24)
  // }


  
  // const toProfile = async (id)=>{
  //   navigate(`/users/search/${id}`)
  // }
  return (<>
    <CreatePost />
    {posts?.map(post => <DisplayPosts post={post}  key={post._id}/>)}
  </>
  )
}
