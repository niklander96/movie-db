import React, { Component } from 'react'
import { Pagination } from 'antd'

import Header from '../Header'
import MovieList from '../MovieList'

import './App.css'

export default class App extends Component {
  state = {
    movies: [],
  }

  createMovItem() {}

  render() {
    return (
      <div className='movie-app'>
        <Header />
        <div className='main'>
          <MovieList />
        </div>
        <Pagination className='app-pagination' size='small' total={50} />
      </div>
    )
  }
}
