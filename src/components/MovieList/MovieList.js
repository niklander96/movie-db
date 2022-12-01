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
    const { loading, moviesArr } = this.props
    if (loading) {
      return (
        <Spin tip='Loading...'>
          <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
        </Spin>
      )
    }

    if (moviesArr.length === 0) {
      return (
        <Alert
          message='Поиск не дал результатов.'
          description='Проверьте правильно ли вы ввели название.'
          type='info'
          closable
        />
      )
    }

    const { isSwitched } = this.props
    const elMovRated = this.props.moviesArrRate.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage, genre, setRating, saveStars, guestId } = el
      console.log(el)
      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArrRate={el}
            genre={genre}
            id={id}
            guestId={guestId}
            title={title}
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
    })

    const elMov = this.props.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage, genre, setRating, saveStars, guestId } = el
      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            genre={genre}
            id={id}
            guestId={guestId}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            loading={loading}
            Paragraph={Paragraph}
            ellipsis={this.state.ellipsis}
            setRating={() => setRating(id)}
            saveStars={saveStars}
          />
        </div>
      )
    })
    console.log(isSwitched)
    console.log(elMovRated)
    return !isSwitched ? (
      <div className='movie-list'>{elMov}</div>
    ) : (
      <div className='movie-list-rated'>{elMovRated}</div>
    )
  }
}
