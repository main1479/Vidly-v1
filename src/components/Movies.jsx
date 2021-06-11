import React, { Component } from 'react';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from './../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: null,
		sortColumn: { path: 'title', order: 'asc' },
		query: '',
	};

	async componentDidMount() {
		const genres = await getGenres();
		const allGenres = [{ name: 'All Movies' }, ...genres];
		const movies = await getMovies();
		this.setState({ movies, genres: allGenres });
	}

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		const newMovies = originalMovies.filter((m) => m._id !== movie._id);
		this.setState({ movies: newMovies });

		try {
			await deleteMovie(movie._id);
		} catch (err) {
			if (err.response && err.response.status === 404)
				toast.error('This movie has already been deleted!');

			if (err.response && err.response.status === 403)
				toast.error('Sorry!! Only Admin can delete a movie');

			this.setState({ movies: originalMovies });
		}
	};

	handleLike = async (movie) => {
		const newMovies = this.state.movies.map((m) => {
			if (m._id === movie._id) m.liked = !movie.liked;

			return m;
		});
		this.setState({ movies: newMovies });
	};
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, query: '', currentPage: 1 });
	};
	handleSort = (sortColumn) => {
		this.setState({ sortColumn: { path: sortColumn.path, order: sortColumn.order } });
	};

	getPageData = () => {
		const {
			movies: allMovies,
			currentPage,
			pageSize,
			query,
			selectedGenre,
			sortColumn,
		} = this.state;
		let filtered = allMovies;
		if (query) {
			filtered = allMovies.filter((m) => m.title.toLowerCase().startsWith(query.toLowerCase()));
		} else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((movie) => movie.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	handleQueryChange = (query) => {
		this.setState({ query, selectedGenre: null, currentPage: 1 });
	};

	render() {
		const { currentPage, pageSize, sortColumn } = this.state;
		const { user } = this.props;

		const { totalCount, data: movies } = this.getPageData();
		return (
			<div className="row">
				<div className="col-3 mt-4">
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className="col">
					{user && user.isAdmin && (
						<Link to="/movies/new" className="btn btn-primary mt-4">
							New Movie
						</Link>
					)}

					<p className="mt-3">
						Showing {totalCount} {totalCount > 1 ? 'Movies' : 'Movie'} from the database
					</p>

					<SearchBox value={this.state.query} onChange={this.handleQueryChange} />
					<MoviesTable
						movies={movies}
						onDelete={this.handleDelete}
						onLike={this.handleLike}
						onSort={this.handleSort}
						sortColumn={sortColumn}
					/>

					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
