import React, { Component } from 'react'
import shave from 'shave'
import { format } from 'date-fns'
import { Rate, Progress } from 'antd'

import './Movie.css'

export default class Movie extends Component {
  render() {
    const { title, overview, releaseDate, posterPath, voteAverage } = this.props
    shave('.movie-description', 100)

    return (
      <div className='view'>
        <div className='movie-avatar'>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <div className='movie-title'>
            <h1 className='movie-head'>{`${title}`}</h1>
            <Progress
              type='circle'
              width={30}
              percent={voteAverage}
              format={(voteAverage) => `${voteAverage}`}
              strokeColor={{
                '0%': '#ff0000',
                '10%': '#87d068',
              }}
            />
          </div>

          <span className='movie-date-exit'>{`${format(new Date(releaseDate), 'MMMM d, yyyy')}`}</span>

          <div className='movie-genres'>
            <div className='movie-genre'>Action</div>
            <div className='movie-genre'>Drama</div>
          </div>
          <p className='movie-description'>{`${overview}`}</p>
          <Rate allowHalf defaultValue={2.5} count={10} />
        </div>
      </div>
    )
  }
}
