import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_GIPHY_BASE_URL,
	timeout: 10000,
	params: {
		api_key: process.env.REACT_APP_GIPHY_API_KEY,
	},
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * @function fetchImages
 * @description Fetch images from Giphy
 * @param {String} query
 */
export const fetchImages = (q) => {
	return axiosInstance
		.request({
			url: 'stickers/search',
			method: 'GET',
			params: {
				limit: 10,
				rating: 'g',
				q,
			},
		})
		.then(( response) => {
			console.log(response);

			return response.data.data.map((entry) => ({
				title: entry.title,
				url: entry.images.downsized_medium.url,
			}));
			// Do something with the adress here
		});
};
