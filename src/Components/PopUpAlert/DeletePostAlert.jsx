import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../Redux/postsSlice.js";
import toast from 'react-hot-toast';

export default function DeletePostAlert({ show, setShow, id }) {


  const dispatch = useDispatch()
  const { token } = useSelector(({ auth }) => auth)
  const getDeletePost = async (postId) => {
    toast.loading("LOADING...")
    setShow(false)
    await dispatch(deletePost({ postId, token }))
    toast.remove()
    toast.success("Deleted successuflly");
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
          <h3>YOU SURE DELETE THIS POST ??! </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success d-flex me-auto align-items-center"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark me-3"></i>
            UNDO DELETE
          </Button>
          <div className="d-flex">
            <Button variant="success d-flex mx-2" onClick={() => getDeletePost(id)}>
              DELETE POST
            </Button>

          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
