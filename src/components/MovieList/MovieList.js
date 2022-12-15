import React, { Component } from 'react'
import { Alert, Pagination, Spin, Typography } from 'antd'

import Movie from '../Movie'
import './MovieList.css'
export default class MovieList extends Component {
  state = {
    ellipsis: true,
  }

  componentDidMount() {
    const { updateMovie } = this.props
    updateMovie('return', 1)
  }

  render() {
    const { Paragraph } = Typography
    const {
      moviesArr,
      currentPage,
      totalPages,
      loading,
      onError,
      onSaveRating,
      inputValue,
      moviesArrRate,
      updateMovie,
      error,
    } = this.props
    const movieAndPagination = moviesArr.map(
      ({ loading, guestId, genre, id, title, overview, releaseDate, posterPath, voteAverage }) => (
        <Movie
          genre={genre}
          id={id}
          key={id}
          guestId={guestId}
          title={title}
          onError={onError}
          overview={overview}
          releaseDate={releaseDate}
          posterPath={posterPath}
          moviesArr={moviesArrRate}
          voteAverage={voteAverage.toFixed(1)}
          loading={loading}
          Paragraph={Paragraph}
          ellipsis={this.state.ellipsis}
          ratedMovie={moviesArrRate[id]}
          onSaveRating={onSaveRating}
        />
      ),
    )

    return (
      <div className='movie-list'>
        {moviesArr.length === 0 && (
          <Alert
            message='Поиск не дал результатов.'
            description='Проверьте правильно ли вы ввели название.'
            type='info'
            closable
          />
        )}
        {loading ? (
          <Spin tip='Loading...'>
            <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
          </Spin>
        ) : (
          !error && moviesArr.length !== 0 && movieAndPagination
        )}
        {!error && (
          <div className='movie-pagination'>
            <Pagination
              className='app-pagination'
              defaultCurrent={currentPage}
              total={totalPages * 10}
              onChange={(currentPage) => updateMovie(inputValue, currentPage)}
            />
          </div>
        )}
      </div>
    )
  }
}
