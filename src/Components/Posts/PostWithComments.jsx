import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDateInDays } from '../../Util/Util.js'
import { getSubPost, like, likePost, unLike } from '../../Redux/postsSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import PopUpAlert from '../PopUpAlert/PopUpAlert.jsx'
import Loading from '../Loading/Loading.jsx'
import CreateComment from '../CreateComment/CreateComment.jsx'
import styles from './Comment.module.css';
import DeletePostAlert from '../PopUpAlert/DeletePostAlert.jsx'
import UpdatePostAlert from '../PopUpAlert/UpdatePostAlert.js'


export default function PostWithComments() {
  const { id } = useParams()
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const dispatch = useDispatch()
  // console.log(id);
  const getPostData = async () => {
    const newPost = await dispatch(getSubPost(id))
  }
  const { subPost: post, isLoading } = useSelector(({ posts }) => posts)
  // console.log(post);
  const { id: userId, token } = useSelector(({ auth }) => auth)
  const getLikePost = async (postId) => {
    if (!userId) {
      setShow(true)
      return
    }
    const value = {
      headers: {
        authorizathion: token
      },
      postId
    }
    const { payload } = await dispatch(likePost(value))
    if (payload.param === "Like") {
      dispatch(like({ userId, postId }))
    } else if (payload.param === "Un Like") {
      dispatch(unLike({ userId, postId }))
    }
  }

  const addFriend = (authorId, userId) => {

    console.log({ authorId, userId });
  }

  useEffect(() => {
    getPostData(id)
  }, [])
  return (
    <>
      {isLoading ? <Loading isLoading={isLoading} /> : <>
        <div className='border-bottom text-start p-3 my-5'>
          <div className='d-flex justify-content-between'>
            <Link to={`/users/search/${post?.authorId?._id}`} className='text-decoration-none'>
              <h2 className=' main_color clickable'>{post?.authorId?.name}<i className="fa-regular fa-address-card mx-1"></i></h2>
            </Link>
            {(post.authorId?._id !== userId && post.authorId !== userId) ?
              <button className="add_friend_btn">Add Friend<i className="fa-solid fa-user-plus mx-2"></i></button> :
              <h6>
                <div className="dropdown open">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <span className="badge bg-secondary">Author</span>
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                  <div className="dropdown-menu p-0" aria-labelledby="triggerId">
                    <button className="btn btn-outline-warning w-100 mb-2" href="#" onClick={() => setShowUpdate(true)}>Update</button>
                    <button className="btn btn-outline-danger w-100" href="#" onClick={() => setShowDelete(true)}>Delete</button>
                  </div>
                </div>
              </h6>}
          </div>
          <h4>{post?.title}</h4>
          <div className='d-flex'>
            <i className="fa-regular fa-user"></i>
            <span className=''>{getDateInDays(post?.createdAt)} Dayes Ago</span>
          </div>

          <p>{post?.content}</p>
          <div>
            <div>
              {!post.postLikes?.includes(userId) ?
                <button className='me-2 btn btn_outline_main main_color' onClick={() => getLikePost(post?._id)}>
                  <i className="fa-solid fa-heart"><span className='badge badge-secondary main_color'>{post.postLikes?.length}</span></i>
                </button> :
                <button className='me-2 btn bg_main main_color' onClick={() => getLikePost(post?._id)}>
                  <i className="fa-regular fa-heart"><span className='badge badge-secondary main_color'>{post.postLikes?.length}</span></i>
                </button>}
              <Link to={`/posts/search/${post?._id}`} >
                <button className='btn btn_outline_main main_color me-2'>
                  <i className="fa-regular fa-comment"></i><span className=' badge badge-secondary main_color'>{post.postComments?.length}</span>
                </button>
              </Link>
              <button className='btn btn-outline-primary d-none'>
                <PopUpAlert show={show} setShow={setShow} />
              </button>
              <button disabled className='btn btn-outline-primary'><div className='text-black-50'>not avilable</div><i className="fa-solid fa-share"></i></button>
            </div>
          </div>
        </div>




        {/* <div>
          {!post.postLikes?.includes(userId) ?
            <button className='btn btn-outline-primary' onClick={() => getLikePost(post?._id)}><i className="fa-solid fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button> :
            <button className='btn btn-primary' onClick={() => getLikePost(post?._id)}><i className="fa-regular fa-heart"><span className='badge badge-secondary text-dark'>{post.postLikes?.length}</span></i></button>}
          <button className='btn btn-outline-primary mx-2'><i className="fa-regular fa-comment"></i></button>
          <button className='btn btn-outline-primary'><i className="fa-solid fa-share"></i></button>
        </div> */}


        <div className=' text-start mb-5 mx-auto'>
          {post?.postComments?.length ? post?.postComments?.map(comment => <div key={comment?._id}>
            <div className={styles.comment}>
              <div className='w-75 m-auto'>

                <div className={styles.header}>
                  <span className={styles.name}>{comment.user_id.name}</span>
                  <span className={styles.timestamp}>{comment.user_id.email}</span>
                </div>
                <div className={styles.content}>{comment.content}</div>
              </div>
            </div>
          </div>) : <h2>No Comments Yet,<label htmlFor='create_comment' className='clickable'>be a firest comment</label> </h2>}
          {}
        </div>
        <div>
          <CreateComment />
        </div>
        <button className='btn btn-outline-primary d-none'>
          <PopUpAlert show={show} setShow={setShow} />
        </button>
      </>}

      <button className='d-none'>
        <DeletePostAlert show={showDelete} setShow={setShowDelete} id={post._id} />
      </button>
      <button className='d-none'>
        <UpdatePostAlert show={showUpdate} setShow={setShowUpdate} post={post} />
      </button>
    </>
  );
}
