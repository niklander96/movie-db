import React, { Component } from 'react'
import { Alert, Spin, Typography } from 'antd'

import Movie from '../Movie'
import './MovieListRated.css'
import MovieServiceSession from '../../services/movie-service-session'

export default class MovieListRated extends Component {
  state = {
    ellipsis: true,
    moviesArrRate: [],
  }
  movieServiceSession = new MovieServiceSession()
  componentDidMount() {
    this.updateRatedMovie(1)
  }

  updateRatedMovie = (page) => {
    this.movieServiceSession
      .getRatedMovies(page)
      .then((movie) => {
        const arrR = movie.results.map((mov) => {
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
          totalRatedPages: pages,
          moviesArrRate: arrR,
          loading: false,
          isSwitched: true,
        })
      })
      .catch(() => this.onError)
  }
  render() {
    const { Paragraph } = Typography
    const { loading, moviesArrRate, guestId, onSaveRating } = this.props
    const movieRatedCards = (
      <div className='movie-card'>
        {moviesArrRate.map(({ title, id, overview, releaseDate, posterPath, voteAverage, genre, onError }) => (
          <Movie
            key={id}
            genre={genre}
            id={id}
            guestId={guestId}
            title={title}
            onError={onError}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage.toFixed(1)}
            loading={loading}
            Paragraph={Paragraph}
            ellipsis={this.state.ellipsis}
            ratedMovie={moviesArrRate[id]}
            onSaveRating={onSaveRating}
          />
        ))}
      </div>
    )
    return (
      <div className='movie-list'>
        {loading && (
          <Spin tip='Loading...'>
            <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
          </Spin>
        )}
        {!loading && movieRatedCards}
      </div>
    )
  }
}
