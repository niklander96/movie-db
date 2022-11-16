import React, { Component } from 'react'
import { Button, Input } from 'antd'

import './Header.css'
import MovieService from '../../services/movie-services'

export default class Header extends Component {
  movieService = new MovieService()

  state = {
    inputValue: '',
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      inputValue: '',
    })
  }

  render() {
    return (
      <div className='app-header'>
        <div className='buttons'>
          <Button type='dashed' className='button app-search-button'>
            Search
          </Button>
          <Button type='dashed' className='button app-rated-button'>
            Rated
          </Button>
        </div>

        <Input placeholder='Type to search...' onChange={this.props.setValue} />
      </div>
    )
  }
}
