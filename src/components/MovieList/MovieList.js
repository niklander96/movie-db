import React, { Component } from 'react'

import Movie from '../Movie'
import './MovieList.css'
import MovieService from '../../services/movie-services'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
// import NetworkDetector from '../NetworkDetector'

export default class MovieList extends Component {
  movieService = new MovieService()

  constructor() {
    super()
    this.state = {
      moviesArr: [],
      loading: false,
      error: false,
      network: true,
    }
  }

  componentDidMount() {
    this.updateMovie()
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //
  // }

  onError = () => {
    this.setState({
      error: true,
      loading: true,
      network: false,
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
    const { loading, error, network } = this.state
    if (loading) {
      return <Spinner />
    }
    if (error) {
      return <Error />
    }
    // if (network) {
    //   return <NetworkDetector />
    // }

    const elMov = this.state.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath } = el

      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            loading={loading}
          />
        </div>
      )
    })
    return <div className='movie-list'>{elMov}</div>
  }
}
