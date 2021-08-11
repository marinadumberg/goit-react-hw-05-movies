import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import LoaderSpiner from '../LoaderSpiner/LoaderSpiner';
import { ToastContainer } from 'react-toastify';
import Container from '../Container/Container';


const HomeView = lazy(() =>
    import('../../pages/HomePage/HomePage'));

    const MoviesPage = lazy(() =>
  import(
    '../../pages/MoviesPage/MoviesPage'
  ),
);
const MovieDetailsView = lazy(() =>
  import(
    '../../pages/MovieDetailsPage/MovieDetailsPage'
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<LoaderSpiner />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
      <ToastContainer />
    </Container>
  );
}