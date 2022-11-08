import React, {Component} from "react";
// import MovieDetails from "../MovieDetails";
import './Movie.css'


export default class Movie extends Component {
	render() {
		return (
		<div className="movie-card">
			<h1 className="movie-head">Movie name</h1>
				<span className="movie-date-exit">02/11/22</span>
				<ul className="movie-genres">
					<li className="movie-genre">Action</li>
					<li className="movie-genre">Drama</li>
				</ul>
				<p className="movie-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolorem dolores illum nesciunt quia. Consequatur eos omnis quas similique sint.</p>
		</div>

	)
	}
}