import React, { Component } from 'react'

import Movie from '../Movie'
import './MovieList.css'
import MovieService from '../../services/movie-services'

export default class MovieList extends Component {
  movieService = new MovieService()

  constructor() {
    super()
    this.state = {
      moviesArr: [],
    }
  }

  componentDidMount() {
    this.updateMovie()
  }

  updateMovie() {
    this.movieService.getAllMovies().then((movie) => {
      console.log(movie)
      const arrM = movie.map((mov) => {
        return {
          id: mov.id,
          title: mov.title,
          overview: mov.overview,
          releaseDate: mov.release_date,
          voteAverage: mov.vote_average,
          posterPath: `https://image.tmdb.org/t/p/original${mov.poster_path}`,
        }
      })
      this.setState({
        moviesArr: arrM,
      })
    })
  }

  render() {
    const elMov = this.state.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, voteAverage, posterPath } = el

      return (
        <div className='movie-card' key={id}>
          <Movie
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            posterPath={posterPath}
          />
        </div>
      )
    })
    return <div className='movie-list'>{elMov}</div>
  }
}
