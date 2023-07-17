

import React from 'react'
import Movies from '../Movies/Movies.jsx'
import Posts from '../Posts/Posts.jsx'
import Users from '../Users/Users.jsx'

export default function Home() {
  return (
    <div>
      <div className=' text-start mt-3'>
        <h2>MOVIES</h2>
        <div className='sec border border-2 rounded-3 mb-3'>
          <Movies />
        </div>
        <h2>POSTS</h2>
        <div className='sec border border-2 rounded-3 mb-3'>
          <Posts />
        </div>
        <h2>USERS</h2>
        <div className='sec border border-2 rounded-3 mb-3'>
          <Users />
        </div>
      </div>




    </div>
  )
}
