import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default function PopUpAlert({ show, setShow }) {
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
          <h3>YOU DON'T LOGED IN, </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success d-flex me-auto align-items-center"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark me-3"></i>
            Close Windwo
          </Button>
          <div className="d-flex">
            <Button variant="success d-flex mx-2">
              <Link className="text-decoration-none text-white" to={"/login"}>
                LOG IN
              </Link>
            </Button>
            <Button variant="success d-flex ">
              <Link className="text-decoration-none text-white" to={"/signup"}>
                REGISTER NOW
              </Link>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
