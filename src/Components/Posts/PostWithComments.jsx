import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDateInDays } from "../../Util/Util.js";
import {
  createPostComment,
  getSubPost,
  like,
  likePost,
  unLike,
} from "../../Redux/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PopUpAlert from "../PopUpAlert/PopUpAlert.jsx";
import { Formik, Form, Field } from "formik";

export default function PostWithComments() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const getPostData = async () => {
    const newPost = await dispatch(getSubPost(id));
  };
  const { subPost: post, isLoading } = useSelector(({ posts }) => posts);
  console.log(post);
  const userId = useSelector(({ auth }) => auth.user._id);
  const getLikePost = async (postId) => {
    if (!userId) {
      setShow(true);
      return;
    }
    const { payload } = await dispatch(likePost({ postId, userId }));
    if (payload.param === "Like") {
      dispatch(like({ userId, postId }));
      console.log("Like");
    } else if (payload.param === "Un Like") {
      dispatch(unLike({ userId, postId }));
      console.log("Un like");
    }
  };
  const CustomTextarea = ({ field, form, ...props }) => {
    return <input variant="outlined" margin="normal" {...field} {...props} />;
  };
  const createCommment = (comment) => {
    console.log(comment);
    if (!userId) {
      setShow(true);
      return;
    }
    // if (!comment.length) {
    //   return;
    // }
    const value = {
      user_id: userId,
      post_id: post._id,
      content: comment.comment,
    };
    console.log(value);
    dispatch(createPostComment(value));
  };
  useEffect(() => {
    getPostData(id);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className=" position-relative text-center w-100 vh-100">
          <span className="d-flex align-content-center justify-content-center position-absolute top-50 start-50 translate-middle">
            <i className="fa-solid fa-spinner fa-spin fs-1 text-primary"></i>
          </span>
        </div>
      ) : (
        <>
          <div className="border-bottom text-start p-3">
            <div className="d-flex justify-content-between">
              <Link to={`/users/search/${post?.authorId?._id}`}>
                <h2 className=" text-primary clickable">
                  {post?.authorId?.name}
                  <i className="fa-regular fa-address-card mx-1"></i>
                </h2>
              </Link>
              <button disabled className="btn btn-primary">
                Follow<div className="text-white-50">not avilable now</div>
              </button>
            </div>
            <h4>{post?.title}</h4>
            <div className="d-flex">
              <i className="fa-regular fa-user"></i>
              <span className="">
                {getDateInDays(post?.createdAt)} Dayes Ago
              </span>
            </div>

            <p>{post?.content}</p>
            <div>
              <button
                className="btn me-2 p-0"
                onClick={() => getLikePost(post._id)}
              >
                {post?.postLikes?.includes(userId) ? (
                  <i className="fa-regular fa-heart btn btn-primary">
                    <span className="badge badge-secondary text-dark">
                      {post.postLikes?.length}
                    </span>
                  </i>
                ) : (
                  <i className="fa-regular fa-heart btn btn-outline-primary">
                    <span className="badge badge-muted text-primary">
                      {post.postLikes?.length}
                    </span>
                  </i>
                )}
              </button>

              <label className="btn btn-outline-primary" htmlFor="comment">
                <i className="fa-regular fa-comment"></i>
                <span className=" badge badge-secondary text-primary">
                  {post?.postComments?.length}
                </span>
              </label>

              <button disabled className="btn btn-outline-primary">
                <div className="text-black-50">not avilable</div>
                <i className="fa-solid fa-share"></i>
              </button>
            </div>
          </div>

          <div>
            {post?.postComments?.length ? (
              <div className=" text-start mb-5">
                {post?.postComments?.map((comment) => (
                  <div key={comment._id}>
                    <Link to={`/users/search/${comment.user_id}`}>
                      <h5 className=" text-primary clickable">
                        {comment.user_id?.name}
                        <i className="fa-regular fa-address-card mx-1"></i>
                        {comment.user_id?._id == post?.authorId._id && (
                          <span className=" badge badge-secondary text-decoration-none text-secondary fs-6">
                            Author
                          </span>
                        )}
                      </h5>
                    </Link>
                    <h6>{comment.content}</h6>
                  </div>
                ))}
              </div>
            ) : (
              <h4 className="my-4">No Comments</h4>
            )}
          </div>
          <Formik initialValues={{ comment: "" }} onSubmit={createCommment}>
            {({ dirty }) => (
              <Form>
                <Field
                  name="comment"
                  label="Comment"
                  component={CustomTextarea}
                  className=" form-control mb-2"
                />
                <button
                  type="submit"
                  disabled={!dirty}
                  className="btn btn-secondary"
                >
                  Create Comment
                </button>
              </Form>
            )}
          </Formik>
          <button className="btn btn-outline-primary d-none">
            <PopUpAlert show={show} setShow={setShow} />
          </button>
        </>
      )}
    </>
  );
}
