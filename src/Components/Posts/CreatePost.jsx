


import React, { useState } from 'react'
import { addPost } from '../../Redux/postsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import PopUpAlert from '../PopUpAlert/PopUpAlert.jsx';
import toast from 'react-hot-toast';




export default function CreatePost() {
    const [post, setPost] = useState(false)
    const [show, setShow] = useState(false);
    const { token } = useSelector(({ auth }) => auth)
    const [formData, setFormData] = useState({ title: "", content: "" });
    const dispatch = useDispatch()
    const handlePost = (e) => {
        e.target.value.length > 0 ? setPost(true) : setPost(false);
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const createPost = async () => {
        if (token == null) {
            setShow(true)
            return
        }
        toast.loading("LOADING...")
        await dispatch(addPost({ formData, token }))
        toast.remove()
        toast.success("Posted successuflly");
        setFormData({ title: "", content: "" })
    }


    return (
        <>
            <Formik
                initialValues={formData}
                onSubmit={createPost}

            >
                {() => (
                    <Form className='my-5'>
                        <div className="form-group">
                            <label htmlFor="title" className='main_color fs-4 d-flex me-auto' >Title</label>
                            <input onChange={handlePost} type="text" className="form-control" value={formData.title} id="title" name="title" required placeholder='please write atitle for a post' />
                        </div>
                        {post && <div className="form-group position-relative post">
                            <label htmlFor="content" className='main_color fs-4 d-flex me-auto'>content</label>
                            <textarea className="form-control" id="content" name="content" value={formData.content} required rows="8" cols="50" onChange={handlePost}></textarea>
                            <button type="submit" className="btn bg_main  position-absolute end-0 bottom-0">Create Post</button>
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
