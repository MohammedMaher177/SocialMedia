


import React, { useState } from 'react'
import { addPost } from '../../Redux/postsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import PopUpAlert from '../PopUpAlert/PopUpAlert.jsx';




export default function CreatePost() {
    const [post, setPost] = useState(false)
    const [show, setShow] = useState(false);
    const { _id } = useSelector(({ auth }) => auth.user)
    // console.log(_id);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const dispatch = useDispatch()
    const handlePost = (e) => {
        e.target.value.length > 0 ? setPost(true) : setPost(false);
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        // console.log(formData);
    }

    const createPost = async () => {
        if (!_id) {
            setShow(true)
            return
        }
        formData.authorId = _id

        dispatch(addPost(formData))
        // console.log(values);
    }


    return (
        <>
            <Formik
                initialValues={formData}
                onSubmit={createPost}

            >
                {() => (
                    <Form className='mb-5'>
                        <div className="form-group">
                            <label htmlFor="title" className='text-primary fs-4 d-flex me-auto'>Title</label>
                            <input onChange={handlePost} type="text" className="form-control" id="title" name="title" required placeholder='please write atitle for a post' />
                        </div>
                        {post && <div className="form-group position-relative post">
                            <label htmlFor="content" className='text-primary fs-4 d-flex me-auto'>content</label>
                            <textarea className="form-control" id="content" name="content" required rows="8" cols="50" onChange={handlePost}></textarea>
                            <button type="submit" className="btn btn-primary position-absolute end-0 bottom-0">Create Post</button>
                        </div>}
                    </Form>
                )}
            </Formik>
            <button className='btn btn-outline-primary d-none'>
                <PopUpAlert show={show} setShow={setShow} />
            </button>

        </>
    )
}
