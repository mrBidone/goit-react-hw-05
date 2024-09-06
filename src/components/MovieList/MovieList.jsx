import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ moviesList }) => {
  const location = useLocation();
  return (
    <>
      <ul>
        {moviesList.map(({ id, title }) => {
          return (
            <Link
              state={{ from: location }}
              className={css.movieLink}
              to={`/movies/${id}`}
              key={id}
            >
              <li>
                <h2>{title}</h2>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
