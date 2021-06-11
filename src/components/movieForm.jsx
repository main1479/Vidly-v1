import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from './../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import { toast } from 'react-toastify';

class MovieForm extends Form {
	state = {
		data: {
			title: '',
			numberInStock: '',
			dailyRentalRate: '',
			genreId: '',
		},
		genres: [],
		errors: {},
	};

	async populateGenres() {
		const genres = await getGenres();
		this.setState({ genres });
	}

	async populateMovie() {
		const movieId = this.props.match.params.id;
		if (movieId === 'new') return;
		try {
			const movie = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (err) {
			if (err.response && err.response.status === 404) this.props.history.replace('/notFound');
		}
	}

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	mapToViewModel = (movie) => {
		return {
			_id: movie._id,
			title: movie.title,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
			genreId: movie.genre._id,
		};
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().required().min(0).max(100).label('Number In Stock'),
		dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate'),
	};

	doSubmit = async () => {
		try {
			await saveMovie(this.state.data);
			this.props.history.push('/movies');
		} catch (err) {
			if (err.response && err.response.status === 400) toast.error('You have to login first!!');
		}
	};

	render() {
		return (
			<div className="mt-3">
				<h1 className="mb-3">Movie Form</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelectInput('genreId', 'Genre', this.state.genres)}
					{this.renderInput('numberInStock', 'Number In Stock')}
					{this.renderInput('dailyRentalRate', 'Rate')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default MovieForm;
