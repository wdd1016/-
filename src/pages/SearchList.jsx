import React from "react";
import SearchListItem from "./SearchListItem";
import "./SearchList.css";
const SearchList = ({ searchInfos, addToWishlist }) => {
  return (
    <>
      <h2>Search Result</h2>
      <ul className="search-list">
        {searchInfos.map((country, index) => (
          <SearchListItem
            key={index}
            index={index}
            country={country}
            addToWishlist={addToWishlist}
          />
        ))}
      </ul>
    </>
  );
};

export default SearchList;
