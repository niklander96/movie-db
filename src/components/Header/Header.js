import React, { Component } from "react"
import SearchField from "../SearchField"
import "./Header.css"
import { Button } from "antd"

export default class Header extends Component {
  render() {
    return <div className="app-header">
      <div className="buttons">
        <Button type="dashed" className="button app-search-button">Search</Button>
        <Button type="dashed" className="button app-rated-button">Rated</Button>
      </div>
      <SearchField
        className="app-search-field"
      />
    </div>
  }
}
