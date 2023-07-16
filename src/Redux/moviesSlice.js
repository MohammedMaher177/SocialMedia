import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { headers } from "../Util/Util.js";
import axios from "axios";

const initialState = {movies : []}


export const getMovies = createAsyncThunk('movies/getMovies', async ()=>{
    const {data} = await axios({
        method: "GET",
        url: `https://themoviesdata-com.onrender.com/movies`,
        headers
    })
    // console.log(data);
    return data.result
}
)

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

    }, extraReducers: builder => {
        builder.addCase(getMovies.fulfilled, (state, actions) => {
            state.movies = actions.payload
        })
    }
})


export const moviesReducer = moviesSlice.reducer;