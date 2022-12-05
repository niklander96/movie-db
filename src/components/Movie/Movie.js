import React, { Component } from 'react'
import { format } from 'date-fns'
import { Rate, Progress } from 'antd'

import './Movie.css'
import { MovieServiceConsumer } from '../MovieServiceContext'
import MovieService from '../../services/movie-services'

export default class Movie extends Component {
  progress
  movieService = new MovieService()

  state = {
    loading: true,
  }

  handleOnLoad = () => {
    this.setState({
      loading: false,
    })
  }

  saveStars = (movieId, rateMovie) => {
    const guestId = sessionStorage.getItem('guestId')
    localStorage.setItem(movieId, JSON.stringify(rateMovie))
    this.movieService.setRated(movieId, rateMovie, guestId).then()
  }

  render() {
    const { title, overview, posterPath, voteAverage, releaseDate, Paragraph, ellipsis, genre, id, loading } =
      this.props
    const defaultRate = localStorage.getItem(id) ? localStorage.getItem(id) : 0
    let formatDate
    try {
      formatDate = format(new Date(releaseDate), 'MMMM dd, yyyy')
    } catch (error) {
      error.message
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
          {loading && <img src='https://via.placeholder.com/250x200' alt='lock' />}
          <img src={`${posterPath}`} alt='movie' onLoad={this.handleOnLoad} />
        </div>
        <div className='description'>
          <div className='movie-title'>
            <h1 className='movie-head'>{`${title}`}</h1>
            <div>{this.progress}</div>
          </div>
          <span className='movie-date-exit'>{`${formatDate}`}</span>
          <div className='movie-genres'>{genreList}</div>
          <Paragraph className='movie-description' ellipsis={ellipsis ? { rows: 3 } : false}>
            {`${overview}`}
          </Paragraph>
          <Rate defaultValue={defaultRate} count={10} onChange={(rate) => this.saveStars(id, rate)} />
        </div>
      </div>
    )
  }
}
