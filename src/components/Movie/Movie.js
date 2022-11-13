import React, { Component } from 'react'
import shave from 'shave'
import { format } from 'date-fns'

import './Movie.css'

export default class Movie extends Component {
  render() {
    const { title, overview, releaseDate, posterPath } = this.props
    shave('.movie-description', 100)

    return (
      <div className='view'>
        <div>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <h1 className='movie-head'>{`${title}`}</h1>
          <span className='movie-date-exit'>{`${format(new Date(releaseDate), 'MMMM d, yyyy')}`}</span>

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
