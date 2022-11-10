import React, { Component } from 'react'

// import MovieDetails from "../MovieDetails";
// import Stars from './Stars/Stars'
import './Movie.css'

export default class Movie extends Component {
  render() {
    const { title, overview, releaseDate, voteAverage, posterPath } = this.props
    console.log(posterPath)
    return (
      <div className='view'>
        <div>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <h1 className='movie-head'>{`${title}`}</h1>
          <span className='movie-date-exit'>{`${releaseDate}`}</span>
          <span className='rating'>{`${voteAverage}`}</span>
          <div className='movie-genres'>
            <div className='movie-genre'>Action</div>
            <div className='movie-genre'>Drama</div>
          </div>
          <p className='movie-description'>{`${overview}`}</p>
        </div>
      </div>
    )
  }
}
