import React, { Component } from 'react'
import { Alert, Input, Pagination, Tabs } from 'antd'
import { debounce } from 'lodash'
import { Detector } from 'react-detect-offline'

import MovieList from '../MovieList'
import './App.css'
import MovieService from '../../services/movie-services'
import MovieServiceSession from '../../services/movie-service-session'
import { MovieServiceProvider } from '../MovieServiceContext'

export default class App extends Component {
  page = 1
  state = {
    moviesArr: [],
    moviesArrRate: [],
    genres: [],
    stars: [],
    loading: false,
    error: false,
    totalPages: 0,
    currentPage: this.page,
    guestId: localStorage.getItem('guestId'),
    inputValue: 'return',
    isSwitched: false,
  }

  movieService = new MovieService()
  movieServiceSession = new MovieServiceSession()

  componentDidMount() {
    const { isSwitched, currentPage, inputValue, guestId } = this.state
    isSwitched ? this.updateRatedMovie(guestId, currentPage) : this.updateMovie(inputValue, currentPage)
    this.getMovieGenres()
    this.setState({
      loading: true,
    })
  }

  componentDidUpdate(prevState) {
    if (this.state.currentPage === prevState.currentPage) {
      this.updateMovie()
    }
    if (!this.state.guestId) {
      this.guestSession()
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
        const arrM = movie.results.map((mov) => {
          return {
            id: mov.id,
            title: mov.title,
            genre: mov.genre_ids,
            overview: mov.overview,
            releaseDate: mov.release_date,
            posterPath: `https://image.tmdb.org/t/p/original${mov.poster_path}`,
            voteAverage: mov.vote_average,
          }
        })
        const pages = movie.total_pages
        this.setState({
          totalPages: pages,
          moviesArr: arrM,
          loading: false,
          isSwitched: false,
        })
      })
      .catch(() => this.onError)
  }

  updateRatedMovie = (guestId, page) => {
    this.movieServiceSession
      .getRatedMovies(guestId, page)
      .then((movie) => {
        const arrR = movie.map((mov) => {
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
          moviesArrRate: arrR,
          loading: false,
          isSwitched: true,
        })
      })
      .catch(() => this.onError)
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
    this.movieServiceSession.getGuestSession().then((guest) => {
      localStorage.setItem('guestId', guest)
    })
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
      moviesArrRate,
      loading,
      id,
      title,
      overview,
      releaseDate,
      posterPath,
      voteAverage,
      error,
      inputValue,
      genre,
      genres,
      guestId,
      isSwitched,
      currentPage,
      totalPages,
    } = this.state
    const items = [
      {
        label: 'Search',
        key: '1',
        children: <Input placeholder='Type to search...' onChange={(e) => this.setValue(e)} autoFocus />,
      },
      {
        label: 'Rated',
        key: '2',
        children: '',
      },
    ]
    return (
      <div className='page'>
        <MovieServiceProvider value={genres}>
          <Detector
            render={({ online }) =>
              online ? (
                <div className='movie-app'>
                  <div className='buttons'>
                    <Tabs
                      className='button app-search-button'
                      destroyInactiveTabPane='true'
                      size='large'
                      onChange={() =>
                        isSwitched
                          ? this.updateMovie(inputValue, currentPage)
                          : this.updateRatedMovie(guestId, currentPage)
                      }
                      items={items}
                    />
                  </div>
                  <MovieList
                    genre={genre}
                    inputValue={inputValue}
                    setValue={this.setValue}
                    moviesArr={moviesArr}
                    moviesArrRate={moviesArrRate}
                    loading={loading}
                    id={id}
                    isSwitched={isSwitched}
                    guestId={guestId}
                    title={title}
                    onError={this.onError}
                    overview={overview}
                    releaseDate={releaseDate}
                    posterPath={posterPath}
                    voteAverage={voteAverage}
                    error={error}
                    saveStars={this.saveStars}
                    setRated={this.setRating}
                  />
                  <div className='movie-app-footer'>
                    <Pagination
                      className='app-pagination'
                      size='small'
                      defaultCurrent={currentPage}
                      total={totalPages * 10}
                      onChange={
                        isSwitched
                          ? (currentPage) => this.updateRatedMovie(guestId, currentPage)
                          : (currentPage) => this.updateMovie(inputValue, currentPage)
                      }
                    />
                  </div>
                </div>
              ) : (
                <Alert
                  className='alert'
                  message='Нет подключения к сети'
                  description='Проверьте настройки сетевого подкючения.'
                  type='error'
                  closable
                />
              )
            }
          />
        </MovieServiceProvider>
      </div>
    )
  }
}

App.defaultProps = {
  inputValue: 'return',
}
