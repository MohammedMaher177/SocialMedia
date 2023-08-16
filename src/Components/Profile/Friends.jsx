

import React from 'react'
import { useSelector } from 'react-redux'

export default function Friends() {

  const { friends } = useSelector(({ profile }) => profile)
  console.log(friends);
  return (
    <>
      {!friends.lenght ? <h2 className='text-warning text-center p-2'>No Posts to Reviw</h2> : friends.lenght}
    </>
  )
}
