import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import { useHistory, useRouteMatch } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';
import LoaderSpiner from '../../components/LoaderSpiner/LoaderSpiner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  const { isExact } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (!isExact) {
      history.push('/');
    }
    (async () => {
      setStatus('pending');
      try {
        await fetchTrendingMovies().then(movies => {
          if (movies.lenght === 0) {
            setStatus('rejected');
            toast.error(`Error!`);
          }
          setMovies(movies);
          setStatus('resolved');
        });
      } catch (error) {
        toast.error(`Error!`);
      }
    })();
  }, [history, isExact]);

  switch (status) {
    case 'idle':
      return <div></div>;

    case 'pending':
      return <LoaderSpiner />;
    case 'resolved':
      return (
        <div>
          <MoviesList movies={movies} />
        </div>
      );
    case 'rejected':
      return (
        <div>
          <h1>Something goes wrong! Reload page please</h1>
        </div>
      );

    default:
      return;
  }
}