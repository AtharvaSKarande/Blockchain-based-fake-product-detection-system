import React, { useState } from "react";
import Layouts from "../Constants/Layout";

const SearchBar = ({ updateLayout, setProductKey }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchProductClicked = (e) => {
    e.preventDefault();
    setProductKey(searchText);
    updateLayout(Layouts.PRODUCT_DETAILS_LAYOUT);
  };

  return (
    <form onSubmit={searchProductClicked}>
      <div className="search-box navbar ">
        <i className="bi bi-search mx-3"></i>
        <input
          className="search-input"
          placeholder="Enter product key here..."
          onChange={handleSearchTextChange}
        />
        <button
          type="submit"
          className="btn btn-dark mx-2"
          onClick={searchProductClicked}
        >
          Check
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
