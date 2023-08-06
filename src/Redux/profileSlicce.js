import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../Util/Util.js"; 

const initialState = {
    user:{

    },
    posts:[],
    isLoading : false
}


export const getProfileData = createAsyncThunk("profilel/getProfile", async (id) => {
    const {data} = await axios({
        method: "GET",
        url: `${baseUrl}/users/search/${id}`,
        headers
    })
    const {posts, user} = data
    return {posts, user}
})



const proflieSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{

    },extraReducers:(builder)=>{
        builder.addCase(getProfileData.pending, (state, actions) => {
            state.isLoading = true
        } )
        builder.addCase(getProfileData.fulfilled, (state, actions) => {
            state.user = actions.payload.user
            state.posts = actions.payload.posts
            state.isLoading = false
        } )
    }
})




export const profileReducer = proflieSlice.reducer;