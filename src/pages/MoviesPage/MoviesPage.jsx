import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { requestMovieBySearch } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("query");

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
    // setSearchParams(query);
    setSearchParams({ query: query });
    form.reset();
  };

  useEffect(() => {
    if (!queryValue) {
      return;
    }
    const fetchMovieBySearch = async () => {
      setIsLoading(true);
      try {
        const { results } = await requestMovieBySearch(queryValue);
        setTimeout(() => {
          if (results.length === 0) {
            setNoResult(true);
            setIsLoading(false);
          } else {
            setSearchMovie(results);
            setIsLoading(false);
            setNoResult(false);
          }
        }, 1000);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchMovieBySearch();
  }, [queryValue]);

  return (
    <section>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {noResult && (
        <p style={{ color: "red" }}>
          No results found for "{queryValue}". Please try again.
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
