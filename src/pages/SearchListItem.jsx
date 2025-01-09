import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./SearchListItem.css";
const SearchListItem = ({ country, addToWishlist }) => {
  return (
    <li onClick={() => addToWishlist(country)} className="search-list-item">
      <img src={country.flag}/>
      {country.name}
      
      <button onClick={() => addToWishlist(country)}>
        <FaPlusCircle />
      </button>
    </li>
  );
};

export default SearchListItem;
