import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import { requestMovieBySearch } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setNoResult(false);
    setSearchMovie([]);
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value.trim();
    if (!query) {
      const notify = () =>
        toast("Please enter the search query!", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "150px",
          },
          className: "",
          icon: "⛔️",
        });
      notify();
      return;
    }
    setSearchQuery(query);
    form.reset();
  };

  useEffect(() => {
    const fetchMovieBySearch = async () => {
      setIsLoading(true);
      try {
        const { results } = await requestMovieBySearch(searchQuery);
        setTimeout(() => {
          if (results.length === 0) {
            setNoResult(true);
            setIsLoading(false);
          } else {
            setSearchMovie(results);
            setIsLoading(false);
            setNoResult(false);
          }
        }, 2000);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    if (searchQuery) {
      fetchMovieBySearch();
    }
  }, [searchQuery]);

  return (
    <section>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {noResult && (
        <p style={{ color: "red" }}>
          No results found for "{searchQuery}". Please try again.
        </p>
      )}
      {searchMovie.length > 0 && <MovieList moviesList={searchMovie} />}
      {error && (
        <p style={{ color: "red" }}>{error}! Please, try again later!</p>
      )}
      <Toaster />
    </section>
  );
};

export default MoviesPage;
