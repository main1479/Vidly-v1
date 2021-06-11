import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
	const status = error.response.status;
	const expectedError = error.response && status >= 400 && status < 500;
	if (!expectedError) {
		logger.log(error);
		toast.error('An unexpected error occurred ☹');
	}

	return Promise.reject(error);
});

function setJwt(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}

const http = {
	get: axios.get,
	post: axios.post,
	delete: axios.delete,
	put: axios.put,
	patch: axios.patch,
	setJwt
};
export default http;
