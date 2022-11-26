import React, { Component } from 'react'
import { format } from 'date-fns'
import { Rate, Progress } from 'antd'

import './Movie.css'
import { MovieServiceConsumer } from '../MovieServiceContext'
export default class Movie extends Component {
  progress

  render() {
    const { title, overview, posterPath, voteAverage, releaseDate, Paragraph, ellipsis, genre, id } = this.props
    let formatDate
    try {
      formatDate = format(new Date(releaseDate), 'MMMM dd, yyyy')
    } catch (error) {
      console.log(error.message)
    }

    if (voteAverage >= 0 && voteAverage <= 3) {
      this.progress = (
        <Progress
          type='circle'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#E90000',
          }}
        />
      )
    } else if (voteAverage >= 3 && voteAverage <= 5) {
      this.progress = (
        <Progress
          type='circle'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#E97E00',
          }}
        />
      )
    } else if (voteAverage >= 5 && voteAverage <= 7) {
      this.progress = (
        <Progress
          type='circle'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#E9D100',
          }}
        />
      )
    } else if (voteAverage > 7) {
      this.progress = (
        <Progress
          type='circle'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#66E900',
          }}
        />
      )
    }

    return (
      <div className='view'>
        <div className='movie-avatar'>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <div className='movie-title'>
            <h1 className='movie-head'>{`${title}`}</h1>
            <div>{this.progress}</div>
          </div>
          <span className='movie-date-exit'>{`${formatDate}`}</span>
          <div className='movie-genres'>
            <MovieServiceConsumer>
              {(genres) => {
                genres.map((el) => {
                  genre.map((item) => {
                    // console.log(el.idGenre, item, el.nameGenre)
                    if (el.idGenre !== item) {
                        console.log(el.nameGenre)
                      return (<div className='movie-genre' key={id}>
                        {`${el.nameGenre}`}
                      </div>)
                    }
                  })
                })
              }}
            </MovieServiceConsumer>
          </div>
          <Paragraph className='movie-description' ellipsis={ellipsis ? { rows: 4 } : false}>
            {`${overview}`}
          </Paragraph>
          <Rate allowHalf defaultValue={0} count={10} />
        </div>
      </div>
    )
  }
}
