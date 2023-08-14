import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, headers } from "../Util/Util.js";
import axios from "axios";
import jwtDecode from "jwt-decode";


const initialState = { user: {}, isLoading: false, id: '', errorMsg: "", token: null }


export const signUp = createAsyncThunk("authen/signup", async (values) => {
    // console.log(values);
    return await axios.post(`${baseUrl}/users/signup`, values).then((result) => {
        // console.log(result);
        return result.data
    }).catch((error) => {
        // console.log(error);
        return error
    })
})
export const signin = createAsyncThunk("authen/signin", async (values) => {
    // console.log(values);
    return await axios.post(`${baseUrl}/users/login`, values).then((result) => {
        // console.log(result);
        return result.data
    }).catch((error) => {
        // console.log(error);
        return error
    })
})


const saveUserData = (id) => {
    localStorage.setItem("userId", id)
}

export const getAccountData = createAsyncThunk("authen/confirmedEmail", async (id) => {
    console.log(id);
    if(id.length > 0){
        const { data } = await axios.get(`${baseUrl}/users/search/${id}`)
        console.log(data);
        return data
    }
})

const authSlice = createSlice({
    name: "authen",
    initialState,
    reducers: {
        logout: (state, actions) => {
            state.user = {}
            state.id = ''
            localStorage.removeItem("userId")
        },
        getUserData: (state, actions) => {
            if (localStorage.getItem('userId')) {
                const token = localStorage.getItem('userId')
                const { id, name, email } = jwtDecode(token)
                state.token = token
                state.user._id = id
                state.id = id
                state.user.name = name
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, actions) => {
            state.isLoading = true
            state.errorMsg = ''
        });
        builder.addCase(signUp.fulfilled, (state, actions) => {
            console.log(actions.payload);
            state.isLoading = false
            if (actions.payload.message == 'success') {
                state.user = actions.payload.user
                state.id = actions.payload.user._id
                saveUserData(actions.payload.token)
            } else {
                state.errorMsg = actions.payload.param
                state.isLoading = false
            }
        })
        builder.addCase(signUp.rejected, (state, actions) => {
            state.isLoading = false
        })
        builder.addCase(signin.pending, (state, actions) => {
            state.isLoading = true
            state.errorMsg = ''
        });
        builder.addCase(signin.fulfilled, (state, actions) => {
            // console.log(actions.payload);
            state.isLoading = false
            if (actions.payload.message == 'success') {
                state.user = actions.payload.user
                state.id = actions.payload.user._id
                state.token = actions.payload.token
                saveUserData(actions.payload.token)
            } else {
                state.errorMsg = actions.payload.param
                // state.isLoading = false
            }
        })
        builder.addCase(signin.rejected, (state, actions) => {
            state.isLoading = false
        })
        // builder.addCase(getUserData.fulfilled, (state, actions) => {
        //     // console.log(actions);
        //     if (actions.payload != null) state.user = actions.payload.user

        // })
        builder.addCase(getAccountData.fulfilled, (state, actions) => {
            console.log(actions);
            if(actions.payload){
                state.user = actions.payload.user
            }
        })

    }
})


export const { logout, getUserData } = authSlice.actions
export const authReducer = authSlice.reducer;