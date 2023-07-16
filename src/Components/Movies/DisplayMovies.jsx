

import React from 'react'

export default function DisplayMovies({ movie }) {
    return (
        <>
            <div className='border-bottom text-start p-3'>

                <h2>{movie.title}</h2>
                <div className='mb-3 row justify-content-between'>
                    <div className=' col-4'>
                        <h5>awards:</h5>
                        <div className='d-flex justify-content-between'>

                            <span>nominations:{movie.awards.nominations}</span>
                            <span>wins:{movie.awards.text}</span>
                        </div>
                    </div>
                    <div className="col-4">
                        <h5>imdb</h5>
                        <div className='d-flex justify-content-between'>
                            <span>rating:{movie.imdb.rating}<i className="fa-regular fa-star text-warning"></i></span>
                            <span>votes:{movie.imdb.votes}</span>
                        </div>
                    </div>
                </div>
                <div className='mb-3'>
                    <h5>Cast:</h5>
                    {movie.cast.map((c, i) => <span className='bg-secondary text-white mx-2 rounded-3 p-1' key={i}>{c}</span>)}
                </div>
                <div className='mb-3'>
                    <h5>countries:</h5>
                    {movie.countries.map((c, i) => <span className='bg-secondary text-white mx-2 rounded-3 p-1' key={i}>{c}</span>)}
                </div>
                <div className='mb-3'>
                    <h5>directors:</h5>
                    {movie.directors.map((c, i) => <span className='bg-secondary text-white mx-2 rounded-3 p-1' key={i}>{c}</span>)}
                </div>
                <div className='mb-3'>
                    <h5>fullplot</h5>
                    <p className='fs-5'>{movie.fullplot}</p>

                </div>
                <div className='mb-3'>
                    <h5>genres:</h5>
                    {movie.genres.map((c, i) => <span className='bg-secondary text-white mx-2 rounded-3 p-1' key={i}>{c}</span>)}
                </div>
            </div>





        </>
    )
}
