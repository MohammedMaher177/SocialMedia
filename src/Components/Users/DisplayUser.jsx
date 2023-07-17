import React from 'react'
import { Link } from 'react-router-dom';
import profilePic from './profile_pictur.png'
import { getDateInDays } from '../../Util/Util.js';
export default function DisplayUser({ user }) {
  return (
    <div className='text-start border-bottom d-flex justify-content-between align-items-center'>
      <div>
        <Link to={`/users/search/${user._id}`} className='fs-3 text-decoration-none'>{user.name}</Link>
        <h4 className='text-secondary'>{user.email}</h4>
        <div className='d-flex flex-column'>

        {user?.createdAt && <span>Joined From: <span className=' text-info'>{getDateInDays(user.createdAt)}</span> dayes ago</span>}
        {user?.gender && <span>Gender: <span className=' text-info'>{user.gender}</span></span>}
        {user?.age && <span>Age: <span className=' text-info'>{user.age} Years</span></span>}
        </div>
        
      </div>
      <div className='p-2'>
        <img src={profilePic} alt="" className=' img-fluid'/>
      </div>
    </div>
  )
}
