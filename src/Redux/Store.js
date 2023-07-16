import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsSlice.js";
import { profileReducer } from "./profileSlicce.js";
import { moviesReducer } from "./moviesSlice.js";



let store = configureStore({
    reducer:{
        posts : postsReducer,
        profile : profileReducer,
        movies : moviesReducer,
    }   
})


export default store;