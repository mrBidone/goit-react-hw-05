import { useEffect, useState } from "react";
import { requestMovieCast } from "../../services/api";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const [cast, setCast] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await requestMovieCast(movieId);
        setCast(response);
      } catch (err) {
        console.log("error:", err.message);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <ul>
      {cast !== null &&
        cast.map(({ id, name, character, profile_path }) => {
          return (
            <li key={id}>
              <img src={imgUrl + profile_path} alt="" />
              <p>{name}</p>
              <p>{character}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieCast;
