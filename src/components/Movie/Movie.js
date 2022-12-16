import React, { Component } from 'react'
import { format } from 'date-fns'
import { Rate, Progress } from 'antd'

import './Movie.css'
import { MovieServiceConsumer } from '../MovieServiceContext'

export default class Movie extends Component {
  render() {
    const {
      title,
      overview,
      posterPath,
      voteAverage,
      releaseDate,
      Paragraph,
      ellipsis,
      genre,
      id,
      onSaveRating,
      ratedMovie,
    } = this.props
    const formatDate = releaseDate ? format(new Date(releaseDate), 'MMMM dd, yyyy') : ''
    const saveStars = (rate) => {
      onSaveRating(id, rate)
    }
    const genreList = genre.map((item) => (
      <MovieServiceConsumer key={item.toString()}>
        {(genres) => {
          return (
            <div className='movie-genre' key={item.toString()}>
              {genres.map((el) => {
                if (item === el.idGenre) {
                  return el.nameGenre
                }
              })}
            </div>
          )
        }}
      </MovieServiceConsumer>
    ))

    return (
      <div className='view'>
        <div className='movie-avatar'>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <div className='movie-title'>
            <h1 className='movie-head'>{`${title}`}</h1>
            <div>
              <Progress
                type='circle'
                width={30}
                percent={100}
                format={() => voteAverage}
                strokeColor={{
                  '100%':
                    (voteAverage >= 0 && voteAverage <= 3 && '#E90000') ||
                    (voteAverage >= 3 && voteAverage <= 5 && '#E97E00') ||
                    (voteAverage >= 5 && voteAverage <= 7 && '#E9D100') ||
                    (voteAverage > 7 && '#66E900'),
                }}
              />
            </div>
          </div>
          <span className='movie-date-exit'>{`${formatDate}`}</span>
          <div className='movie-genres'>{genreList}</div>
          <Paragraph className='movie-description' ellipsis={ellipsis ? { rows: 3 } : false}>
            {`${overview}`}
          </Paragraph>
          <Rate value={ratedMovie} count={10} onChange={saveStars} onSaveRating={onSaveRating} />
        </div>
      </div>
    )
  }
}
