import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await requestMovieReviews(movieId);
        setReviews(response);
      } catch (err) {
        console.log("error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {isLoading && <Loader />}
      <ul>
        {reviews !== null && reviews.length > 0 ? (
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
          })
        ) : (
          <li>
            <p>Sorry, we have no reviews for this movie yet.</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default MovieReviews;
