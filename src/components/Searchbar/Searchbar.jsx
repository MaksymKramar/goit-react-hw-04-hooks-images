import { useState } from "react";
import PropTypes from "prop-types";

export default function Searchbar({ onSearch }) {
  const [nameValue, setNameValue] = useState("");

  const handleNameChange = (e) => {
    setNameValue(e.currentTarget.value.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (nameValue.trim() === "") {
      return alert("Enter valid name,please!");
    }
    onSearch(nameValue);
    setNameValue("");
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSearch}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleNameChange}
          className="SearchForm-input"
          type="text"
          name="searchName"
          value={nameValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
