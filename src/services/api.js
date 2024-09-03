import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1MmY5MGQ0Y2Y4Y2FlMjBlM2Y4MTM2MDJkMzEwNyIsIm5iZiI6MTcyNTE5NDY3OS4zNzc1NzgsInN1YiI6IjY2ZDM2NTU4NjZlZTk2ODU0ZGMwZDc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UETx5_BdThFYoccZ2gNsKfCLe9sb1P085Zd8OR2aA-M",
  },
};

export const requestAllTrendMovies = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data;
};

export const requestMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const requestMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const requestMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
};

export const requestMovieBySearch = async (searchQuery) => {
  const response = await axios.get(
    `search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};
