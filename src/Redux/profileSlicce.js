import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../Util/Util.js";
import { toast } from "react-hot-toast";

const initialState = {
    user: {

    },
    posts: [],
    isLoading: false,
    firendRequest: [],
    friends : []
}


export const getProfileData = createAsyncThunk("profilel/getProfile", async (id) => {
    const { data } = await axios({
        method: "GET",
        url: `${baseUrl}/users/search/${id}`,
        headers
    })
    const { posts, user } = data
    // console.log(data);
    return { posts, user }
})

export const firendRequest = createAsyncThunk("profile/friendRequest", async (val) => {
    const { token, user_id } = val
    // console.log(val);
    toast.loading("LOADING...")
    const { data } = await axios.post(`${baseUrl}/users/addfriend`, { user_id }, { headers: { authorization: token } })
    // console.log(data);
    toast.remove()
    toast.success(data.param);
    return data
})

export const getFrientRequests = createAsyncThunk("profile/getFriendRequest", async (token) => {
    const { data } = await axios.get(`${baseUrl}/users/friendrequests`, { headers: { authorization: token } })
    // console.log(data);
    return data.firendRequest
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
            state.friends = actions.payload.user.firends
            state.posts = actions.payload.posts
            state.isLoading = false
        })
        builder.addCase(getFrientRequests.fulfilled, (state, actions) => {
            state.firendRequest = actions.payload
        })
        builder.addCase(firendRequest.fulfilled, (state, actions) => {
            if(actions.payload.message === 'success'){
                state.user = actions.payload.recivedUser
            }
        })
    }
})




export const profileReducer = proflieSlice.reducer;