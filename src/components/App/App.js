import React, { Component } from 'react'
import { Pagination } from 'antd'
import { debounce } from 'lodash'

import Header from '../Header'
import MovieList from '../MovieList'
import './App.css'
import MovieService from '../../services/movie-services'
import { MovieServiceProvider } from '../MovieServiceContext'

export default class App extends Component {
  page = 1
  state = {
    moviesArr: [],
    genres: [],
    loading: true,
    error: false,
    currentPage: this.page,
    guestId: '',
    inputValue: 'return',
  }

  movieService = new MovieService()

  componentDidMount() {
    this.guestSession()
    this.getMovieGenres()
    this.updateMovie(this.state.inputValue, this.state.currentPage)
    this.setState({
      loading: true,
    })
  }

  componentDidUpdate(prevState) {
    if (this.state.currentPage === prevState.currentPage) {
      this.updateMovie()
    }
    if (this.state.guestId !== prevState.guestId) {
      this.getRating(this.state.guestId)
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovie = (string, number) => {
    this.movieService
      .getMovies(string, number)
      .then((movie) => {
        const arrM = movie.map((mov) => {
          return {
            id: mov.id,
            title: mov.title,
            genre: mov.genre_ids,
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

  guestSession = () => {
    this.movieService.getGuestSession().then((guest) => {
      this.setState({
        guestId: guest,
      })
      return guest
    })
  }

  getRating = (idG) => {
    this.movieService.getRated(idG).then(() => {
      return (idG = this.state.guestId)
    })
    console.log(idG)
  }

  getMovieGenres = () => {
    this.movieService.getGenres().then((genre) => {
      const genreItems = genre.map((gen) => {
        return {
          idGenre: gen.id,
          nameGenre: gen.name,
        }
      })
      this.setState({
        genres: genreItems,
      })
    })
  }

  render() {
    const {
      moviesArr,
      loading,
      id,
      title,
      overview,
      releaseDate,
      posterPath,
      voteAverage,
      error,
      inputValue,
      genres,
      genre,
    } = this.state
    return (
      <MovieServiceProvider value={this.page}>
        <div className='movie-app'>
          <div className='movie-app-header'>
            <Header setValue={this.setValue} />
          </div>
          <div className='movie-app-main'>
            <MovieList
              genre={genre}
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
              total={500}
              onChange={(currentPage) => this.updateMovie(inputValue, currentPage)}
            />
          </div>
        </div>
      </MovieServiceProvider>
    )
  }
}

App.defaultProps = {
  inputValue: 'return',
}
