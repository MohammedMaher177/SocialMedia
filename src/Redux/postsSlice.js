



//https://themoviesdata-com.onrender.com/posts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { posts: [], isLoading: false, subPost: {} }

const headers = {
    "Content-Type": "application/json; charset=UTF-8",
}

const fetchData = async (method, endPoint = "") => {
    const { data } = await axios({
        method,
        url: `https://themoviesdata-com.onrender.com/posts/${endPoint}`,
        headers
    })
    return data
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const { result } = await fetchData("GET")
    return result
})
export const getSubPost = createAsyncThunk('posts/getSubPost', async (id) => {
    const { result } = await fetchData("GET", `search/${id}`)
    return result
})

export const addPost = createAsyncThunk("posts/addPost", async (values) => {
    // console.log(values);
    const { data } = await axios({
        method: "POST",
        url: `https://themoviesdata-com.onrender.com/posts`,
        headers
    })
    // console.log(data);
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, actions) => {
            state.isLoading = true
        });
        builder.addCase(getPosts.fulfilled, (state, actions) => {
            state.posts = actions.payload
            state.isLoading = false
        });
        builder.addCase(getSubPost.pending, (state, actions) => {
            state.isLoading = true
        });
        builder.addCase(getSubPost.fulfilled, (state, actions) => {
            state.subPost = actions.payload
            state.isLoading = false
        });
    }
})


export const postsReducer = postsSlice.reducer;
