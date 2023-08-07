

import React, { useState } from 'react'
import { Button, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./CreateComment.module.css"
import { useParams } from 'react-router-dom';
import { addComment } from '../../Redux/postsSlice.js';
import { toast } from 'react-hot-toast';

export default function CreateComment() {


    const [comment, setComment] = useState("")
    const { id: post_id } = useParams()
    const dispatch = useDispatch()
    const { token } = useSelector(({ auth }) => auth)
    const onChange = (e) => {
        setComment(e.target.value)
    };

    const createComment = async (e) => {
        e.preventDefault()
        const body = {
            post_id,
            content: comment
        }
        toast.loading("LOADING...")
        await dispatch(addComment({ body, token }))
        toast.remove()
        toast.success("Comment Posted successuflly");
        setComment("")
    }

    return (
        <>
            <div className='container text-center'>
                <form onSubmit={createComment}>
                    <Space direction="vertical" size="middle" style={{ width: '50%', }}>
                        <Space.Compact style={{ width: '100%', }}>
                            <Input defaultValue="Combine input and button" showCount maxLength={40}
                                value={comment} onChange={onChange} id="create_comment" />
                            <Button className={styles.comment_btn} onClick={createComment}>Comment</Button>
                        </Space.Compact>
                    </Space>
                </form>
            </div>

        </>
    )
}
