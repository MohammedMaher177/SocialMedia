

import React from 'react'
import Movies from '../Movies/Movies.jsx'
import Users from '../Users/Users.jsx'
import Posts from '../Posts/Posts.jsx'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div className='container-fluid p-3'>
        <div className=' text-start mt-3'>
          <h2><Link to="/posts" className=' text-decoration-none text-muted title'>POSTS</Link></h2>
          <div className='border border-2 rounded-3 mb-3'>
            <Posts />
          </div>
        </div>

        <Helmet>
          <title>My Social Media APP</title>
        </Helmet>
      </div>
    </>
  )
}
