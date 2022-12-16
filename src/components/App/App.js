import React, { Component } from 'react'
import { Alert, Input, Tabs } from 'antd'
import { debounce } from 'lodash'
import { Detector } from 'react-detect-offline'

import MovieList from '../MovieList'
import MovieListRated from '../MovieListRated'
import './App.css'
import MovieService from '../../services/movie-services'
import MovieServiceSession from '../../services/movie-service-session'
import { MovieServiceProvider } from '../MovieServiceContext'

export default class App extends Component {
  page = 1
  state = {
    moviesArr: [],
    moviesArrRate: {},
    genres: [],
    stars: [],
    loading: true,
    error: false,
    totalPages: 0,
    totalRatedPages: 0,
    currentPage: this.page,
    guestId: localStorage.getItem('guestId'),
    inputValue: 'return',
    isSwitched: false,
  }

  movieService = new MovieService()
  movieServiceSession = new MovieServiceSession()

  componentDidMount() {
    const { guestId } = this.state
    if (!guestId) {
      this.movieServiceSession
        .getGuestSession()
        .then((guest) => {
          localStorage.setItem('guestId', guest.guest_session_id)
        })
        .then(() => this.getRatedMovies())
        .then(() => this.movieService.getGenres())
        .then((genre) => {
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

    this.getRatedMovies()
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

  getRatedMovies = () => {
    this.movieServiceSession
      .getRatedMovies(1)
      .then((res) => res.total_pages)
      .then((pages) => {
        const allMovies = []

        for (let i = 1; i <= pages; i += 1) {
          allMovies.push(this.movieServiceSession.getRatedMovies(i))
        }

        Promise.all(allMovies).then((res) => {
          this.setState({
            moviesArrRate: res
              .reduce((acc, page) => [...acc, ...page.results], [])
              .map((movie) => ({ [movie.id]: movie.rating }))
              .reduce((acc, obj) => ({ ...acc, [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]] }), {}),
          })
        })
      })
  }

  setValue = debounce((e) => {
    this.updateMovie(e.target.value, this.state.currentPage)
    this.setState({
      loading: true,
      inputValue: e.target.value,
      currentPage: this.page,
    })
  }, 1000)

  onSaveRating = (id, rating) => {
    this.movieServiceSession.setRated(id, rating).then()
    this.setState((state) => ({
      moviesArrRate: { ...state.moviesArrRate, [id]: rating },
    }))
  }

  render() {
    const { moviesArr, moviesArrRate, loading, error, inputValue, genres, guestId, currentPage, totalPages } =
      this.state
    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <div>
            <Input placeholder='Type to search...' onChange={(e) => this.setValue(e)} autoFocus />
            <MovieList
              updateMovie={this.updateMovie}
              inputValue={inputValue}
              setValue={this.setValue}
              moviesArr={moviesArr}
              moviesArrRate={moviesArrRate}
              loading={loading}
              guestId={guestId}
              onError={this.onError}
              onSaveRating={this.onSaveRating}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        ),
      },
      {
        label: 'Rated',
        key: '2',
        children: <MovieListRated moviesArrRateId={moviesArrRate} onSaveRating={this.onSaveRating} />,
      },
    ]
    return (
      <div className='page'>
        <div className='movie-app'>
          <MovieServiceProvider value={genres}>
            <Detector
              render={({ online }) =>
                online ? (
                  <div className='buttons'>
                    <Tabs destroyInactiveTabPane centered items={items} />
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
      </div>
    )
  }
}

App.defaultProps = {
  inputValue: 'return',
}
