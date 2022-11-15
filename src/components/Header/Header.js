import React, { Component } from 'react'
import { Button, Input } from 'antd'
import { debounce } from 'lodash'
import { Spin } from "antd"

import './Header.css'
import MovieService from '../../services/movie-services'

export default class Header extends Component {
  movieService = new MovieService()

  state = {
    inputValue: '',
    loading: false,
  }

  handleChange = debounce((inputValue) => {
    this.movieService.getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=5e847ceaa13e81e351a64ec0755ba00e&language=en-US&query=${inputValue}&page=1`,
      )
      .then(res => res.json())
    this.setState({
      loading: true
    })

  },2000)

  // debounceTest = debounce(() => {
  //   this.setState({
  //     loading: false,
  //   })
  // })
  //
  // debounceWork = (e) => {
  //   const {
  //     target: { value },
  //   } = e
  //   this.setState({
  //     loading: true,
  //     inputValue: value,
  //   })
  // }

  setValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render() {
    const { inputValue, loading } = this.state
    console.log(inputValue)
    // if (loading) {
    //   return <Spin />
    // }

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
          <Input
            placeholder='Type to search...'
            onChange={(e) => this.handleChange(e.target.value)}
            // value={inputValue}
          />
      </div>
    )
  }
}
