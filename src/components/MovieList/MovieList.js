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
      const { title, id, overview, releaseDate, posterPath, voteAverage, genre } = el
      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            genre={genre}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            loading={loading}
            Paragraph={Paragraph}
            ellipsis={this.state.ellipsis}
          />
        </div>
      )
    })
    return <div className='movie-list'>{elMov}</div>
  }
}
