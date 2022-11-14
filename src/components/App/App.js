import React, { Component } from 'react'

import Header from '../Header'
import MovieList from '../MovieList'
import Pagi from '../Pagination/Pagination'

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
        <Pagi
        className="app-pagination"
        />
      </div>
    )
  }
}
