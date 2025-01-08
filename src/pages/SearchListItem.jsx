import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./SearchListItem.css";
const SearchListItem = ({ country, addToWishlist }) => {
  return (
    <li className="search-list-item">
      {country}
      <button onClick={() => addToWishlist(country)}>
        <FaPlusCircle />
      </button>
    </li>
  );
};

export default SearchListItem;
