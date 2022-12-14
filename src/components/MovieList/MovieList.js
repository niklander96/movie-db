import React, { Component } from 'react'
import { Alert, Spin, Typography } from 'antd'

import Movie from '../Movie'
import './MovieList.css'

export default class MovieList extends Component {
  state = {
    ellipsis: true,
  }
  render() {
    const { Paragraph } = Typography
    const { loading, moviesArr, moviesArrRate, guestId, onSaveRating, isSwitched } = this.props
    const arr = isSwitched ? moviesArrRate : moviesArr
    return (
      <div className='movie-list'>
        {loading && (
          <Spin tip='Loading...'>
            <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
          </Spin>
        )}
        {moviesArr.length === 0 && !loading ? (
          <Alert
            message='Поиск не дал результатов.'
            description='Проверьте правильно ли вы ввели название.'
            type='info'
            closable
          />
        ) : (
          ''
        )}
        {!loading &&
          arr.map((el) => {
            const { title, id, overview, releaseDate, posterPath, voteAverage, genre, onError } = el
            return (
              <div className='movie-card' key={id}>
                <Movie
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
              </div>
            )
          })}
      </div>
    )
  }
}
