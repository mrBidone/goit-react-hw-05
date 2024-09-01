import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieReviews } from "../../services/api";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await requestMovieReviews(movieId);
        console.log(response);
        setReviews(response);
      } catch (err) {
        console.log("error:", err.message);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <ul>
      {reviews !== null &&
        reviews.map(({ id, author, content, author_details }) => {
          return (
            <li key={id}>
              {!author_details.avatar_path ? (
                <p>❌</p>
              ) : (
                <img src={imgUrl + author_details.avatar_path} alt="" />
              )}
              <p>Author: {author}</p>
              {!author_details.rating ? (
                <p>Rating: --</p>
              ) : (
                <p>Rating: {author_details.rating}/10</p>
              )}
              <p>Review: {content}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieReviews;
