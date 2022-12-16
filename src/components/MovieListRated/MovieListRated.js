import React, { Component } from 'react'
import { Alert, Pagination, Spin, Typography } from 'antd'

import Movie from '../Movie'
import './MovieListRated.css'
import MovieServiceSession from '../../services/movie-service-session'

export default class MovieListRated extends Component {
  movieServiceSession = new MovieServiceSession()
  state = {
    ellipsis: true,
    moviesArrRate: [],
    loading: true,
    currentPage: 1,
    totalRatedPages: 0,
  }

  componentDidMount() {
    this.getRatedMovie(1)
  }

  getRatedMovie = (page) => {
    this.movieServiceSession.getRatedMovies(page).then((movie) => {
      this.setState({
        moviesArrRate: movie.results.map((mov) => {
          return {
            id: mov.id,
            title: mov.title,
            genre: mov.genre_ids,
            overview: mov.overview,
            releaseDate: mov.release_date,
            posterPath: `https://image.tmdb.org/t/p/original${mov.poster_path}`,
            voteAverage: mov.vote_average,
          }
        }),
        totalRatedPages: movie.total_pages,
        loading: false,
      })
    })
  }

  changePage = (page) => {
    this.setState({ currentPage: page, loading: true })
    this.getRatedMovie(page)
  }

  render() {
    const { Paragraph } = Typography
    const { loading, currentPage, totalRatedPages, moviesArrRate, ellipsis } = this.state
    const { guestId, onSaveRating, moviesArrRateId } = this.props
    const movieRatedCards = (
      <div className='movie-list'>
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
            ellipsis={ellipsis}
            ratedMovie={moviesArrRateId[id]}
            onSaveRating={onSaveRating}
          />
        ))}
      </div>
    )
    return (
      <div>
        {!loading && moviesArrRate.length === 0 && (
          <Alert
            message='Нет оцененных фильмов.'
            description='Проверьте, оценили ли вы какой-нибудь фильм.'
            type='info'
            closable
          />
        )}
        {loading ? (
          <Spin tip='Loading...'>
            <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
          </Spin>
        ) : (
          moviesArrRate.length !== 0 && (
            <div className='movie-list'>
              {movieRatedCards}
              <div className='movie-pagination'>
                <Pagination current={currentPage} total={totalRatedPages * 10} onChange={this.changePage} />
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}
