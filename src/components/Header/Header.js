import React, { Component } from 'react'
import { Button } from 'antd'

import './Header.css'

export default class Header extends Component {
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
      </div>
    )
  }
}
