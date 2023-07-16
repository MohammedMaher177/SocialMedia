

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../../Redux/moviesSlice.js'
import DisplayMovies from './DisplayMovies.jsx'





export default function Movies() {

  const dispatch = useDispatch()
  const getAllMovies = async () => {
   const movies =  await dispatch(getMovies())
  //  console.log(movies);
  }
  const movies = useSelector(({movies})=>movies.movies)
  // console.log(movies);
  useEffect(() => {
    getAllMovies()
  }, [])

  return (<div className='border rounded-3 mt-5'>

  {movies?.map(movie => <DisplayMovies movie={movie} key={movie._id}/>)}
  
  </div>
    
  )
}
