import React, { Component } from 'react'
import { Spin } from 'antd'

import Movie from '../Movie'
import './MovieList.css'
import MovieService from '../../services/movie-services'
import Error from '../Error/Error'

export default class MovieList extends Component {
  movieService = new MovieService()

  constructor() {
    super()
    this.state = {
      moviesArr: [],
      loading: true,
      error: false,
      network: true,
    }
  }

  componentDidMount() {
    this.updateMovie()
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovie() {
    this.movieService
      .getAllMovies()
      .then((movie) => {
        const arrM = movie.map((mov) => {
          return {
            id: mov.id,
            title: mov.title,
            overview: mov.overview,
            releaseDate: mov.release_date,
            posterPath: `https://image.tmdb.org/t/p/original${mov.poster_path}`,
            voteAverage: mov.vote_average,
          }
        })
        this.setState({
          moviesArr: arrM,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { loading, error } = this.state
    if (loading) {
      return <Spin />
    }
    if (error) {
      return <Error />
    }

    const elMov = this.state.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage } = el

      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            loading={loading}
          />
        </div>
      )
    })
    return <div className='movie-list'>{elMov}</div>
  }
}
