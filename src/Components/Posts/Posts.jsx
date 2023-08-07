

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../Redux/postsSlice.js'
import CreatePost from './CreatePost.jsx'
import DisplayPosts from './DisplayPosts.jsx'
import Loading from '../Loading/Loading.jsx'
import { Helmet } from 'react-helmet'




export default function Posts() {
  const dispatch = useDispatch()
  let { posts, isLoading } = useSelector(state => state.posts)
  // console.log(posts);
  const getAllPosts = async () => {
     await dispatch(getPosts())

    //  posts?.reverse()
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (<>
    <Helmet >
      <title>My Social Media APP / Posts</title>
    </Helmet>
    <CreatePost />
    {/* <Skeleton loading={isLoading} active></Skeleton> */}
    {isLoading ? <Loading isLoading={isLoading}/> : posts?.map(post => <DisplayPosts post={post} key={post._id} />)}


  </>
  )
}
