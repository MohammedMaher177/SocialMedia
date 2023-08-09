import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../Util/Util.js";

const initialState = {}

// export const addComment = createAsyncThunk("comment/createComment", async (value) => {
//     const { body, token } = value
//     console.log(value);
//     const headers = { authorization: token }

//     const { data } = await axios.post(`${baseUrl}/posts/addComment`, body, {headers})
//     console.log(data);
// })


export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {

    }, extraReducers: builder => {

    }
})

export const commentReducer = commentSlice.reducer;