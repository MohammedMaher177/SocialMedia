

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../../Redux/moviesSlice.js'
import DisplayMovies from './DisplayMovies.jsx'
import Loading from '../Loading/Loading.jsx'
import { Helmet } from 'react-helmet'





export default function Movies() {

  const dispatch = useDispatch()
  const getAllMovies = async () => {
   await dispatch(getMovies())
    //  console.log(movies);
  }
  const { movies, isLoading } = useSelector(({ movies }) => movies)
  // console.log(movies);
  useEffect(() => {
    getAllMovies()
  }, [])

  return (<div className='border rounded-3 mt-3 h-100'>
    <Helmet >
      <title>My Social Media APP / Movies</title>
      </Helmet>

    {isLoading ? <Loading /> : movies?.map(movie => <DisplayMovies movie={movie} key={movie._id} />)}

  </div>

  )
}
