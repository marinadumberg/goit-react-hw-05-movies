import { useEffect, useState, lazy, Suspense } from 'react';
import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  useParams,
} from 'react-router-dom';
import { fetchMovieById } from '../../services/Api';
import LoaderSpiner from '../../components/LoaderSpiner/LoaderSpiner';
import s from './MovieDetailsPage.module.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

const Cast = lazy(() =>
  import('../../components/Cast/Cast'),
);
const Reviews = lazy(() =>
  import('../../components/Reviews/Reviews'),
);

export default function MovieDetailsView() {
  const { url } = useRouteMatch();

  const [movie, setMovie] = useState(null);
  const [urlLocation, setUrlLocation] = useState('');
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  

  const locationParam = () => {
    const path = location.state?.from.pathname;
    const search = location.state?.from.search;
    setUrlLocation({
      path: path,
      search: search,
    });
  };

 
  useEffect(() => {
    fetchMovieById(movieId).then(movie => setMovie(movie));
   
  }, [movieId]);

  useEffect(() => {
    locationParam();
  }, []);
  const onBackBtn = () => {
    history.push(`${urlLocation.path}${urlLocation.search}` ?? '/');
  };

  return (
    <>
      <MovieDetails movie={movie} onClick={onBackBtn} />

      <hr />
      <div className={s.additionalInfCont}>
        <p className={s.movieDescrTitle}>Additional information</p>
        <NavLink
          to={`${url}/cast`}
          className={s.navLink}
          activeClassName={s.navLinkactive}
        >
          Cast
        </NavLink>
        <NavLink
          to={`${url}/reviews`}
          className={s.navLink}
          activeClassName={s.navLinkactive}
        >
          Reviews
        </NavLink>

        <Suspense fallback={<LoaderSpiner />}>
          <Switch>
            <Route path="/movies/:movieId/cast">
              <Cast />
            </Route>
            <Route path="/movies/:movieId/reviews">
              <Reviews />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}