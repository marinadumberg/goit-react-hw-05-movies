import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchSearcingMovies } from '../../services/Api';
import MoviesList from '../../components/MoviesList/MoviesList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [status, setStatus] = useState('idle');
  
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!searchQuery) return;
    (async () => {
      setStatus('pending');
      try {
        await fetchSearcingMovies(searchQuery).then(movies => {
          
          if (!movies.length) {
            toast.error(` "${searchQuery}" not finded! `);
            setStatus('rejected');
            throw new Error('No results');
          } else {
            setMovies(movies);
            setStatus('resolved');
          }
        });
      } catch (error) {}
    })();
  }, [searchQuery]);

  const handleSubmit = query => {
    if (!query || query === searchQuery) return;

    setMovies([]);

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  switch (status) {
    case 'idle':
      return (
        <div>
          <SearchBar onSubmit={handleSubmit} />
          <h1>Search your favorites movies here!</h1>
        </div>
      );
    case 'pending':
      return <SearchBar onSubmit={handleSubmit} />;
    case 'resolved':
      return (
        <>
          <SearchBar onSubmit={handleSubmit} />
          <MoviesList movies={movies} />
        </>
      );
    case 'rejected':
      return (
        <>
          <SearchBar onSubmit={handleSubmit} />
        </>
      );

    default:
      return;
  }
}

MoviesPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};