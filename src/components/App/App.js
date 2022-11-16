import React, { Component } from 'react'
import { Pagination } from 'antd'
import { debounce } from 'lodash'

import Header from '../Header'
import MovieList from '../MovieList'
import './App.css'
import MovieService from '../../services/movie-services'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    moviesArr: [],
    loading: true,
    error: false,
    network: true,
    string: '',
  }

  componentDidMount() {
    this.updateMovie('return', 1)
    this.setState({
      loading: true,
      string: '',
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovie(string, number) {
    this.movieService
      .getMovies(string, number)
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

  setValue = debounce((e) => {
    this.updateMovie(e.target.value, 1)
    this.setState({
      loading: true,
    })
  }, 1000)

  render() {
    const { moviesArr, loading, id, title, overview, releaseDate, posterPath, voteAverage, error, inputValue } =
      this.state

    return (
      <div className='movie-app'>
        <Header inputValue={inputValue} setValue={this.setValue} />
        <div className='main'>
          <MovieList
            moviesArr={moviesArr}
            loading={loading}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            error={error}
          />
        </div>
        <Pagination className='app-pagination' size='small' total={50} />
      </div>
    )
  }
}
