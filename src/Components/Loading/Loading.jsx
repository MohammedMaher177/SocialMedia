import React from 'react'

export default function Loading() {
    return (
        <div className=' position-relative text-center w-100 vh-100'>
            <span className='d-flex align-content-center justify-content-center position-absolute top-50 start-50 translate-middle'>
                <i className="fa-solid fa-spinner fa-spin fs-1 text-primary"></i>
            </span>
        </div>
    )
}
