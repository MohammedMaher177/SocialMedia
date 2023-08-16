




import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFrientRequests } from '../../Redux/profileSlicce.js';

export default function FirendRequest() {
    const { user, token } = useSelector(({ auth }) => auth)
    const { firendRequest } = useSelector(({ profile }) => profile)
    const dispatch = useDispatch()

    const getRequests = async () => {
        await dispatch(getFrientRequests(token))
    }

    useEffect(() => {
        getRequests(token)
    }, [])
    return (
        <>
            {!firendRequest?.lenght ? <h2 className='text-warning text-center p-2'>No Friend Request yet</h2> : firendRequest.lenght}
        </>
    )
}
