import { useState } from "react";

const MoviesPage = () => {
  const [searchMovie, setSearchMovie] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  return (
    <section>
      <h1>Movies Page</h1>
    </section>
  );
};

export default MoviesPage;
