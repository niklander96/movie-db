import React, { Component } from 'react'

// import Header from '../Header'
import MovieList from '../MovieList'
import Pagi from '../Pagination/Pagination'
import './App.css'

export default class App extends Component {
  maxId = 0

  state = {
    movies: [],
  }

  createMovItem() {}

  render() {
    return (
      <section className='movie-app'>
        <section className='main'>
          <MovieList />
        </section>
        {/*<Pagi />*/}
      </section>
    )
  }
}
