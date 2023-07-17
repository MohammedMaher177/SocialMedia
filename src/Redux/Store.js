import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsSlice.js";
import { profileReducer } from "./profileSlicce.js";
import { moviesReducer } from "./moviesSlice.js";
import { usersReducer } from "./usersSlice.js";
import { authReducer } from "./authSlice.js";



let store = configureStore({
    reducer:{
        posts : postsReducer,
        profile : profileReducer,
        movies : moviesReducer,
        users : usersReducer,
        auth : authReducer,
    }   
})


export default store;