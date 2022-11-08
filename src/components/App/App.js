import React, {Component} from "react";

import Header from '../Header'
import MovieList from "../MovieList";

import './App.css';

export default class App extends Component {

	maxId = 0

	state = {
		movies: [],

	}

	createMovItem() {

	}
	render() {
		return (
			<section className="movie-app">
				<header className="header">
					<Header />
				</header>
				<section className="main">
					<MovieList />
				</section>
			</section>
		)

	}
}