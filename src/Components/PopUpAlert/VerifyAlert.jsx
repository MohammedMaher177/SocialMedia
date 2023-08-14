


import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
export default function VerifyAlert({ show, setShow, id }) {
    const navigate = useNavigate()
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
                <Modal.Header closeButton className=" top-0 position-absolut">
                    <Modal.Title className=" text-center">
                        <div className="d-flex align-items-center justify-content-center mb-5">
                            <div className="line-after-star firest-chiled bg-secondary"></div>
                            <i className="fa-solid fa-star custom-icon fs-1 mx-3"></i>
                            <div className="line-after-star last-chiled bg-secondary"></div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Your Email is Verified </h3>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex">
                        <Button variant="success d-flex mx-2" onClick={() => navigate(`/users/search/${id}`, { replace: true })}>
                            Go to your Profile
                        </Button>
                        <Button variant="success d-flex mx-2" onClick={() => navigate(`/SocialMedia`, { replace: true })}>
                            Go to your Home Page
                        </Button>

                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
