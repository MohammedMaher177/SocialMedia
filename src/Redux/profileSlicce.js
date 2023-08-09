import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../Util/Util.js";
import { toast } from "react-hot-toast";

const initialState = {
    user: {

    },
    posts: [],
    isLoading: false
}


export const getProfileData = createAsyncThunk("profilel/getProfile", async (id) => {
    const { data } = await axios({
        method: "GET",
        url: `${baseUrl}/users/search/${id}`,
        headers
    })
    const { posts, user } = data
    return { posts, user }
})

export const firendRequest = createAsyncThunk("profile/firendRequest", async (val) => {
    const { token, user_id } = val
    toast.loading("LOADING...")
    const { data } = await axios.post(`${baseUrl}/users/addfirend`, { user_id }, { headers: { authorization: token } })
    toast.remove()
    toast.success(data.param);
    return data
})


const proflieSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(getProfileData.pending, (state, actions) => {
            state.isLoading = true
            state.user = {}
        })
        builder.addCase(getProfileData.fulfilled, (state, actions) => {
            // console.log(actions.payload);
            state.user = actions.payload.user
            state.posts = actions.payload.posts
            state.isLoading = false
        })
    }
})




export const profileReducer = proflieSlice.reducer;