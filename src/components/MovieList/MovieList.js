import React, { Component } from 'react'
import { Alert, Spin } from 'antd'

import Movie from '../Movie'
import './MovieList.css'

export default class MovieList extends Component {
  render() {
    const { loading, error, moviesArr } = this.props
    if (loading) {
      return <Spin />
    }

    if (error) {
      return (
        <Alert
          message='Нет подключения к сети'
          description='Проверьте настройки сетевого подкючения'
          type='error'
          closable
        />
      )
    }

    if (moviesArr.length === 0) {
      return (
        <Alert
          message='Поиск не дал результатов'
          description='Проверьте правильно ли вы ввели название'
          type='info'
          closable
        />
      )
    }
    const elMov = this.props.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage } = el

      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            loading={loading}
          />
        </div>
      )
    })
    return <div className='movie-list'>{elMov}</div>
  }
}
