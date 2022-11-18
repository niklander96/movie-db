import React, { Component } from 'react'
import { Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import Header from '../Header'
import MovieList from '../MovieList'
import './App.css'
import MovieService from '../../services/movie-services'

export default class App extends Component {
  movieService = new MovieService()

  page = 1
  state = {
    moviesArr: [],
    genres: [],
    loading: true,
    error: false,
    network: true,
    currentPage: this.page,
    inputValue: 'return',
  }

  componentDidMount() {
    this.updateMovie(this.state.inputValue, this.state.currentPage)
    this.setState({
      loading: true,
    })
  }

  componentDidUpdate(prevState) {
    if (this.state.currentPage === prevState.currentPage) {
      this.updateMovie()
    }
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
            currentPage: mov.page,
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
    this.updateMovie(e.target.value, this.state.currentPage)
    this.setState({
      loading: true,
      inputValue: e.target.value,
      currentPage: this.page,
    })
  }, 1000)

  render() {
    const { moviesArr, loading, id, title, overview, releaseDate, posterPath, voteAverage, error, inputValue } =
      this.state

    return (
      <div className='movie-app'>
        <div className='movie-app-header'>
          <Header />
        </div>
        <div className='movie-app-main'>
          {!loading ? (
            <form>
              <Input placeholder='Type to search...' onChange={(e) => this.setValue(e)} autoFocus />
            </form>
          ) : null}
          <MovieList
            inputValue={inputValue}
            setValue={this.setValue}
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
        <div className='movie-app-footer'>
          <Pagination
            className='app-pagination'
            size='small'
            total={50}
            onChange={(currentPage) => this.updateMovie(inputValue, currentPage)}
          />
        </div>
      </div>
    )
  }
}
