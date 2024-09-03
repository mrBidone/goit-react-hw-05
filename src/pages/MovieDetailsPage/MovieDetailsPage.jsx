import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { requestMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  const location = useLocation();
  const goBackLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await requestMovieDetails(movieId);
        setTimeout(() => {
          setMovieDetails(response);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {isLoading && <Loader />}
      {movieDetails !== null && (
        <>
          <div className={css.movieDetContainer}>
            {error && (
              <p style={{ color: "red" }}>{error}! Please, try again later!</p>
            )}
            <Link className={css.goBackLink} to={goBackLink.current}>
              Go back
            </Link>
            <div className={css.movieFirstWrapper}>
              <img
                className={css.movieDetImage}
                src={imgUrl + movieDetails.backdrop_path}
                alt={`${movieDetails.title} movie-cover`}
              />
              <div className={css.movieSecondWrapper}>
                <h1 className={css.movieDetTitle}>
                  {movieDetails.title}{" "}
                  <span className={css.movieDetYear}>
                    ({movieDetails.release_date.split("-")[0]})
                  </span>
                </h1>
                <p className={css.movieUserScore}>
                  User Score:{" "}
                  <span className={css.movieUserScoreStat}>
                    {Math.floor(parseFloat(movieDetails.vote_average) * 10)}
                  </span>
                  %
                </p>
                <h2 className={css.movieSubTitle}>Overview</h2>
                <p className={css.movieDescr}>{movieDetails.overview}</p>
                <h2 className={css.movieSubTitle}>Genres</h2>
                <p className={css.movieDescr}>
                  {movieDetails?.genres?.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className={css.movieInfoWrap}>
            <h2 className={css.movieSubTitle}>Aditional information</h2>
            <Link className={css.movieLink} to="cast">
              Cast
            </Link>
            <Link className={css.movieLink} to="reviews">
              Reviews
            </Link>
          </div>
          <div>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
