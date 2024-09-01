import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { requestMovieDetails } from "../../services/api";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await requestMovieDetails(movieId);
        console.log(response);
        setMovieDetails(response);
      } catch (err) {
        console.log("error:", err.message);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movieDetails !== null && (
        <>
          <div>
            <img
              src={imgUrl + movieDetails.backdrop_path}
              alt={`${movieDetails.title} movie-cover`}
            />
            <h1>
              {movieDetails.title}{" "}
              <span>({movieDetails.release_date.split("-")[0]})</span>
            </h1>
            <p>
              User Score:{" "}
              <span>
                {Math.floor(parseFloat(movieDetails.vote_average) * 10)}
              </span>
              %
            </p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h2>Genres</h2>
            <p>{movieDetails?.genres?.map((genre) => genre.name).join(", ")}</p>
          </div>

          <div>
            <h2>Aditional information</h2>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
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
