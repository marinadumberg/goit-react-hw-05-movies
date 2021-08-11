import s from './MovieDetails.module.css';
export default function MovieDetails({ movie, onClick }) {
  return (
    <>
      {movie && (
        <div>
          <button type="button" onClick={onClick} className={s.btn}>
            Go back
          </button>

          <div className={s.movieContainer}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `https://www.peakndt.com/wp-content/uploads/2017/02/No_picture_available.png`
              }
              alt={movie.original_title}
              className={s.movieImage}
            />
            <div className={s.movieDetailsContainer}>
              <h2 className={s.movieTitle}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p className={s.text}>
                User Score:
                <span className={s.movieScore}>{movie.vote_average * 10}%</span>
              </p>
              <h3 className={s.movieDescrTitle}>Overview</h3>
              <p className={s.movieDescription}>{movie.overview}</p>
              <h3 className={s.movieDescrTitle}>Genres:</h3>
              <ul>
                {movie.genres &&
                  movie.genres.map(genre => (
                    <li key={genre.id} className={s.genreItem}>
                      {genre.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}