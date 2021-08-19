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

export const fetchSearcingMovies = async query => {
  try {
    const searchingMovies = await axios
      .get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
      )
      .then(({ data }) => data.results);
    return searchingMovies;
  } catch (error) {
    console.error(error);
  }
};
export const fetchMovieById = async id => {
  try {
    const movieDetails = await axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.data);
    return movieDetails;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCastById = async id => {
  try {
    const getCast = await axios
      .get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(res => res.data)
      .then(data => data.cast);
    return getCast;
  } catch (error) {
    console.error(error);
  }
};

export const fetchReviewById = async id => {
  try {
    const getMovieReviews = await axios
      .get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
      .then(res => res.data)
      .then(data => data.results);
    return getMovieReviews;
  } catch (error) {
    console.error(error);
  }
};
