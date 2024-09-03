import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  return (
    <>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Please enter the movie name"
        />
        <button className={css.submitBtn} type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
