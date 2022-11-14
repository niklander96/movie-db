import { Input } from 'antd'
import React, { Component } from 'react'

import MovieService from '../../services/movie-services'

export default class SearchField extends Component {
  movieService = new MovieService()

  state = {
    value: '',
  }

  setValue = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.movieService.getAllMovies()
  }

  render() {
    const { value } = this.state
    console.log(value)
    return <Input placeholder='Type to search...' onChange={(e) => console.log(e.target.value)} />
  }
}
