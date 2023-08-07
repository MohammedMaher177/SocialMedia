

import React from 'react'
import Movies from '../Movies/Movies.jsx'
import Posts from '../Posts/Posts.jsx'
import Users from '../Users/Users.jsx'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='container'>
      <div className=' text-start mt-3'>
        <h2><Link to="./movies" className=' text-decoration-none text-muted title'>MOVIES</Link></h2>
        <div className='sec border border-2 rounded-3 mb-3'>
          <Movies />
        </div>
        <h2><Link to="/posts" className=' text-decoration-none text-muted title'>POSTS</Link></h2>
        <div className='sec border border-2 rounded-3 mb-3'>
          <Posts />
        </div>
        <h2><Link to="./users" className=' text-decoration-none text-muted title'>USERS</Link></h2>
        <div className='sec border border-2 rounded-3 mb-3'>
          <Users />
        </div>
      </div>

      <Helmet>
        <title>My Social Media APP</title>
      </Helmet>
    </div>
  )
}
