import { useEffect, useState } from "react";
import { requestAllTrendMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [trendMovies, setTrendsMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendsMovies = async () => {
      setIsLoading(true);
      try {
        const response = await requestAllTrendMovies();
        setTimeout(() => {
          setTrendsMovies(response.results);
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchTrendsMovies();
  }, []);
  return (
    <>
      <section>
        <h1>Trending today</h1>
        {isLoading && <Loader />}
        {error && (
          <p style={{ color: "red" }}>{error}! Please, try again later!</p>
        )}
        {trendMovies.length > 0 && <MovieList moviesList={trendMovies} />}
      </section>
    </>
  );
};

export default HomePage;
