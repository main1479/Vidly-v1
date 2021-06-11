import http from './httpService';

const apiEndpoint = `/movies`;

export async function getMovies() {
	const { data } = await http.get(apiEndpoint);
	return data;
}
export async function getMovie(movieId) {
	const { data } = await http.get(`${apiEndpoint}/${movieId}`);
	return data;
}

export async function deleteMovie(movieId) {
	await http.delete(`${apiEndpoint}/${movieId}`);
}


export function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;
		return http.put(`${apiEndpoint}/${movie._id}`, body);
	}
	return http.post(apiEndpoint, movie);
}
