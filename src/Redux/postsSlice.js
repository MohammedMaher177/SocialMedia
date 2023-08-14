//https://themoviesdata-com.onrender.com/posts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../Util/Util.js";

const initialState = { posts: [], isLoading: false, subPost: {} }


const fetchData = async (method, endPoint = "") => {
    const { data } = await axios({
        method,
        url: `${baseUrl}/posts/${endPoint}`,
        headers,
    });
    return data;
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const { result } = await fetchData("GET", "getSortedposts")
    // const { result } = await fetchData("GET")
    // console.log(result);
    return result
})

export const getSubPost = createAsyncThunk('posts/getSubPost', async (id) => {
    const { result } = await fetchData("GET", `search/${id}`)
    return result
})

export const addPost = createAsyncThunk("posts/addPost", async (values) => {
    const headers = { authorization: values.token }
    // console.log(headers);
    const { data } = await axios.post(`${baseUrl}/posts`, values.formData, {
        headers
    })
        .then(res => res)
        .catch(err => err)
    // console.log(data);
    return data
})

export const likePost = createAsyncThunk("post/like", async (value, state) => {
    const { headers, postId } = value
    const { data } = await axios.post(`${baseUrl}/posts/like`, { postId }, { headers })
        .then(res => res)
        .catch(err => err)
    // console.log(data);
    return data
})

export const deletePost = createAsyncThunk("post/delete", async (value) => {
    console.log(value);
    const headers = { authorization: value.token }
    const { data } = await axios.delete(`${baseUrl}/posts/${value.postId}`, { headers })
    console.log(data);
    return data
})

export const addComment = createAsyncThunk("comment/createComment", async (value) => {
    const { body, token } = value
    console.log(value);
    const headers = { authorization: token }

    const { data } = await axios.post(`${baseUrl}/posts/addComment`, body, { headers })
    console.log(data);
    return data.new_post
})

export const updatePost = createAsyncThunk("post/update", async (value) => {
    const { values, token, _id } = value
    console.log(value);

    const headers = { authorization: token }
    const { data } = await axios.put(`${baseUrl}/posts/${_id}`, { title: values.title, content: values.content }, { headers })
    console.log(data);
    return data
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        unLike: (state, actions) => {
            const { userId, postId } = actions.payload
            // console.log({userId, postId});
            for (const post of state.posts) {
                if (post._id === postId) {
                    post.postLikes = post.postLikes.filter(userId => {
                        return userId !== actions.payload.userId
                    })
                }
            }
            // console.log(state.posts);
        },
        like: (state, actions) => {
            const { userId, postId } = actions.payload
            // console.log({userId, postId});
            for (const post of state.posts) {
                if (post._id === postId) {
                    post.postLikes.push(userId)
                }
            }
            // console.log(state.posts);
        }, handleFirendReq: (state, actions) => {            
            state.posts.map(post => {
                if(post._id == actions.payload.post_id){
                    post.authorId = actions.payload.recivedUser
                }
            })
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, actions) => {
            state.isLoading = true
        });
        builder.addCase(getPosts.fulfilled, (state, actions) => {
            state.posts = actions.payload
            state.isLoading = false
        });
        builder.addCase(getPosts.rejected, (state, actions) => {
            state.isLoading = false
        });

        builder.addCase(likePost.fulfilled, (state, actions) => {
            console.log(actions.payload);
            if (actions.payload.post._id === state.subPost._id) {
                state.subPost.postLikes = actions.payload.post.postLikes;
            }
        })
        builder.addCase(getSubPost.pending, (state, actions) => {
            state.isLoading = true
        });
        builder.addCase(getSubPost.fulfilled, (state, actions) => {
            state.subPost = actions.payload
            state.isLoading = false
        });
        builder.addCase(addPost.fulfilled, (state, actions) => {
            if (actions.payload.message == "success") {
                state.posts.unshift(actions.payload.result)
            }
        })
        builder.addCase(deletePost.fulfilled, (state, actions) => {
            console.log(actions.payload);
            if (actions.payload.message === "succes") {
                state.posts = state.posts.filter(post => post._id !== actions.payload.result._id)
            }
        })
        builder.addCase(updatePost.fulfilled, (state, actions) => {
            if (actions.payload.message == "success") {
                console.log(actions.payload);
                const postIndex = state.posts.findIndex(post => post._id == actions.payload.result._id)
                if (postIndex != -1) {
                    state.posts[postIndex] = actions.payload.result;
                }
            }
        })

        builder.addCase(addComment.fulfilled, (state, actions) => {
            state.subPost.postComments = actions.payload.postComments
        })
    }
})


export const postsReducer = postsSlice.reducer;

export const { unLike, like, handleFirendReq } = postsSlice.actions;
