import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Redux/usersSlice.js';
import DisplayUser from './DisplayUser.jsx';
import Loading from '../Loading/Loading.jsx';
import { Helmet } from 'react-helmet';

export default function Users() {

  const dispatch = useDispatch()
  const { users, isLoading } = useSelector(({ users }) => users)
  // console.log({ users, isLoading });

  const getUsers = async () => {
    await dispatch(getAllUsers())
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div className='pt-3'>
      <Helmet >
      <title>My Social Media APP / Users</title>
      </Helmet>
      {isLoading ? <Loading /> : users?.map(user => <DisplayUser user={user} key={user._id} />)}



    </div>
  )
}
