import React, { Component } from 'react'
import { format } from 'date-fns'
import { Rate, Progress, Typography } from 'antd'
import './Movie.css'

export default class Movie extends Component {
  state = {
    ellipsis: true,
  }

  render() {
    const { title, overview, releaseDate, posterPath, voteAverage } = this.props
    const { ellipsis } = this.state
    const { Paragraph } = Typography
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
              percent={100}
              format={() => `${voteAverage}`}
              strokeColor={{
                '100%': '#87d068',
              }}
            />
          </div>
          <span className='movie-date-exit'>{`${format(new Date(releaseDate), 'MMMM d, yyyy')}`}</span>
          <div className='movie-genres'>
            <div className='movie-genre'>Action</div>
            <div className='movie-genre'>Drama</div>
          </div>
          <Paragraph className='movie-description' ellipsis={ellipsis ? { rows: 4 } : false}>
            {`${overview}`}
          </Paragraph>
          <Rate allowHalf defaultValue={2.5} count={10} />
        </div>
      </div>
    )
  }
}
