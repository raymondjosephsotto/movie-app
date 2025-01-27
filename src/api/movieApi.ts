import axios from 'axios';

const movieApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL for all requests
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`, // Attach the ACCESS_TOKEN
    accept: 'application/json', // Accept JSON responses
  },
});

export default movieApi;