import React, {Component} from "react";

import Movie from "../Movie";

import './MovieList.css'

export default class MovieList extends Component {
	render() {
		return (
			<ul className="movie-list">
				<li className="movie-list-item">
					<Movie />
				</li>
			</ul>
		)
	}
}

