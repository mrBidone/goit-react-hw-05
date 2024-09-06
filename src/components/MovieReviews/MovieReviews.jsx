import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";
import { FaUser } from "react-icons/fa";

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
      <ul className={css.reviewsList}>
        {reviews !== null && reviews.length > 0 ? (
          reviews.map(({ id, author, content, author_details }) => {
            return (
              <li className={css.reviewsItem} key={id}>
                <div className={css.reviewWrapper}>
                  {!author_details.avatar_path ? (
                    <div className={css.reviewsNoAvatar}>
                      <FaUser />
                    </div>
                  ) : (
                    <img
                      className={css.reviewsAvatar}
                      src={imgUrl + author_details.avatar_path}
                      alt=""
                      width="100"
                    />
                  )}
                  <div className={css.titleReviewWrapper}>
                    <p className={css.reviewsAuthorName}>Author: {author}</p>
                    {!author_details.rating ? (
                      <p>Rating: --</p>
                    ) : (
                      <p>Rating: {author_details.rating}/10</p>
                    )}
                  </div>
                </div>

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
