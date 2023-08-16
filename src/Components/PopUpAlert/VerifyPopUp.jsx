


import React from 'react'
import { Modal, Button } from "react-bootstrap";
export default function VerifyPopUp({ show, setShow, id }) {
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
                    <h3>Your Email is Registered, Please check your inbox </h3>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex">
                        <Button variant="success d-flex mx-2" onClick={handleClose}>
                            Ok
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
