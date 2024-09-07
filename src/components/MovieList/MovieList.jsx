import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ moviesList }) => {
  const location = useLocation();
  return (
    <>
      <ul>
        {moviesList.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
              className={css.movieLink}
            >
              <h2>{title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
