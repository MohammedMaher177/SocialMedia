import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from 'formik';
import { updatePost } from "../../Redux/postsSlice.js";
import toast from 'react-hot-toast';

export default function UpdatePostAlert({ show, setShow, post }) {
    const { _id } = post
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ title: post.title, content: post.content });
    const { token } = useSelector(({ auth }) => auth)
    const getUpdatePost = async (value) => {
        // console.log(value);
        console.log(formData);
        const { title, content } = formData
        const values = { title, content }
        toast.loading("LOADING...")
        const res = await dispatch(updatePost({ _id, token, values }))
        toast.remove()
        toast.success("Updated successuflly");
        setShow(false)
    }
    const handlePost = (e) => {

        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(formData);
    }
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <div variant="primary" onClick={handleOpen}>
                <div className="item position-relative">
                    <div className="layer rounded-4 bg-success">
                        <i className="fa-solid fa-plus fs-1 fw-bolder text-white"></i>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                className=" position-relativ"
            >
                <Modal.Header closeButton className=" top-0 position-absolut mb-2">
                    <Modal.Title className=" text-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="line-after-star firest-chiled bg-secondary"></div>
                            <i className="fa-solid fa-star custom-icon fs-1 mx-3"> UPDATE POST</i>
                            <div className="line-after-star last-chiled bg-secondary"></div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={formData}
                        onSubmit={getUpdatePost}

                    >
                        {() => (
                            <Form className='my-5'>
                                <div className="form-group">
                                    <label htmlFor="title" className='text-primary fs-4 d-flex me-auto' >Title</label>
                                    <input onChange={handlePost} type="text" className="form-control" value={formData.title} id="title" name="title" required placeholder='please write atitle for a post' />
                                </div>
                                <div className="form-group position-relative post">
                                    <label htmlFor="content" className='text-primary fs-4 d-flex me-auto'>content</label>
                                    <textarea className="form-control" id="content" name="content" value={formData.content} required rows="8" cols="50" onChange={handlePost}></textarea>

                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success d-flex me-auto align-items-center"
                        onClick={handleClose}
                    >
                        <i className="fa-solid fa-xmark me-3"></i>
                        UNDO UPDATE
                    </Button>
                    <div className="d-flex">
                        <Button variant="success d-flex mx-2" type="submit" onClick={getUpdatePost}>
                            UPDATE POST
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
