import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewById } from '../../services/Api';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetchReviewById(movieId);
    console.log(fetchReviewById(movieId).then(data => setReview(data)));
  }, [movieId]);

  return (
    <div className={s.container}>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(review => (
            <li key={review.id} className={s.listItem}>
              <h3 className={s.author}>{review.author}</h3>
              <p className={s.description}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.description}>No reviews for this movie </p>
      )}
    </div>
  );
}