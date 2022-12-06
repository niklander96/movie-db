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
    const { loading, moviesArr, isSwitched, moviesArrRate } = this.props
    const arr = isSwitched ? moviesArrRate : moviesArr
    return (
      <div className='movie-list'>
        {loading && (
          <Spin tip='Loading...'>
            <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
          </Spin>
        )}
        {moviesArr.length === 0 && (
          <Alert
            message='Поиск не дал результатов.'
            description='Проверьте правильно ли вы ввели название.'
            type='info'
            closable
          />
        )}
        {arr.map((el) => {
          const {
            title,
            id,
            overview,
            releaseDate,
            posterPath,
            voteAverage,
            genre,
            setRating,
            saveStars,
            guestId,
            onError,
          } = el
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
                setRating={() => setRating(id)}
                saveStars={saveStars}
              />
            </div>
          )
        })}
      </div>
    )
  }
}
