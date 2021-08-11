import axios from 'axios';

const API_KEY = '3c8d298ed6b0f606ed03ddfbd2a77fe3';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchTrendingMovies = async () => {
  try {
    const tredingFilms = await axios
      .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then(({ data }) => data.results);
    return tredingFilms;
  } catch (error) {
    console.error(error);
  }
};