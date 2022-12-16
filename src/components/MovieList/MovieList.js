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
    const { moviesArr, currentPage, totalPages, loading, onSaveRating, inputValue, moviesArrRate, updateMovie, error } =
      this.props
    const movieAndPagination = moviesArr.map(
      ({ loading, guestId, genre, id, title, overview, releaseDate, posterPath, voteAverage }) => (
        <Movie
          genre={genre}
          id={id}
          key={id}
          guestId={guestId}
          title={title}
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
      <div>
        {!loading && !error && moviesArr.length === 0 && (
          <Alert
            message='Поиск не дал результатов.'
            description='Проверьте правильно ли вы ввели название.'
            type='info'
            closable
          />
        )}
        {loading && !error ? (
          <Spin tip='Loading...'>
            <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
          </Spin>
        ) : (
          !error &&
          moviesArr.length !== 0 && (
            <div className='movie-list'>
              {movieAndPagination}
              <div className='movie-pagination'>
                <Pagination
                  showSizeChanger={false}
                  defaultCurrent={currentPage}
                  total={totalPages * 10}
                  onChange={(currentPage) => updateMovie(inputValue, currentPage)}
                />
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}
