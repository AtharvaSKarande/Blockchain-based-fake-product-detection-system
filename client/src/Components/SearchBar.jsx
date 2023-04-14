import React, { useState } from "react";
import { toast } from "react-toastify";
import Layouts from "../Constants/Layout";
import ToastConfig from "../Constants/ToastConfig";

const SearchBar = ({ updateLayout, setProductKey }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchProductClicked = (e) => {
    e.preventDefault();
    if (searchText.length) {
      setProductKey(searchText);
      updateLayout(Layouts.PRODUCT_DETAILS_LAYOUT);
    } else {
      toast.warning("Enter the product key first!", ToastConfig.WARNING);
    }
  };

  return (
    <form onSubmit={searchProductClicked}>
      <div className="search-box navbar">
        <i className="bi bi-search mx-3"></i>
        <input
          className="search-input"
          placeholder="Enter product key here..."
          onChange={handleSearchTextChange}
        />
        <button
          type="submit"
          className="btn btn-outline-secondary mx-2"
          onClick={searchProductClicked}
        >
          Check
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
