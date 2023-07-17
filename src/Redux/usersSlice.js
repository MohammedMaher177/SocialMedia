import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, headers } from "../Util/Util.js";


const initialState = { users: [], isLoading: false }


export const getAllUsers = createAsyncThunk("users/getUsers", async () => {
    const  data  = await axios(`${baseUrl}/users`, { methode: "GET", headers })
        .then(({ data }) => {
            return data
        }).catch((error) => {
            // console.log(error);
        })
    // console.log(data);
    return data.users
})


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, actions) => {
            state.users = actions.payload
            state.isLoading = false
        })
        builder.addCase(getAllUsers.rejected, (state, actions) => {
            state.isLoading = false
        })
    }
})

export const usersReducer = usersSlice.reducer;