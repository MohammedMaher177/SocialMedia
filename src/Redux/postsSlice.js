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

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const { result } = await fetchData("GET");
  return result;
});
export const getSubPost = createAsyncThunk("posts/getSubPost", async (id) => {
  const { result } = await fetchData("GET", `search/${id}`);
  return result;
});

export const addPost = createAsyncThunk("posts/addPost", async (values) => {
  console.log(values);
  const { data } = await axios
    .post(`${baseUrl}/posts`, values)
    .then((res) => res)
    .catch((err) => err);
  console.log(data);
  return data.message;
});

export const likePost = createAsyncThunk("post/like", async (value, state) => {
  const { data } = await axios
    .post(`${baseUrl}/posts/like`, value)
    .then((res) => res)
    .catch((err) => err);
  // console.log(data);
  return data;
});

export const createPostComment = createAsyncThunk(
  "post/comment",
  async (value) => {
    console.log(value);
    const { data } = await axios
      .post(`${baseUrl}/posts/addComment`, value, headers)
      .then((res) => res)
      .catch((err) => err);
    console.log(data);
    return data.message
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
        builder.addCase(getPosts.rejected, (state, actions) => {
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
