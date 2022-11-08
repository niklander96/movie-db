import React, {Component} from "react";
import MovieDetails from "../MovieDetails";
import './Movie.css'


export default class Movie extends Component {
	render() {
		return (
			<div className="movie-list-item-info">
				<h1 className="movie-head"></h1>
				<span className="movie-date-exit"></span>
				<ul className="movie-genres">
					<li className="movie-genre"></li>
				</ul>
				<input type="button" className="movie-genre" />
				<p className="movie-description"></p>
			</div>
		)
	}
}