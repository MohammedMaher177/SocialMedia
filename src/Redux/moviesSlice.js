import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, headers } from "../Util/Util.js";
import axios from "axios";

const initialState = {movies : [], isLoading : false}


export const getMovies = createAsyncThunk('movies/getMovies', async ()=>{
    const {data} = await axios({
        method: "GET",
        url: `${baseUrl}/movies`,
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
        builder.addCase(getMovies.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(getMovies.fulfilled, (state, actions) => {
            state.movies = actions.payload
            state.isLoading = false
        })
        builder.addCase(getMovies.rejected, (state, actions) => {
            state.movies = actions.payload
            state.isLoading = false
        })
    }
})


export const moviesReducer = moviesSlice.reducer;