import { useEffect, useState } from "react";
import { requestAllTrendMovies } from "../../services/api";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [trendMovies, setTrendsMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await requestAllTrendMovies();
        setTrendsMovies(response.results);
      } catch (err) {
        console.log("error:", err);
      }
    };
    fetchMovies();
  }, []);
  return (
    <>
      <section>
        <h1>Trending today</h1>
        {trendMovies.map(({ id, title }) => {
          return (
            <Link to={`/movies/${id}`} key={id}>
              <h2>{title}</h2>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default HomePage;
