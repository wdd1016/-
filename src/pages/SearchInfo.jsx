import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SearchList from "./SearchList";
import Wishlist from "./WishList";
import "./MainLayout.css";
import "./SearchInfo.css";

const SearchInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const searchCountries = async () => {
    if (searchTerm.trim() === "") {
      alert("Where do you want to fly to");
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("국가 정보를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setCountries(data.map((country) => country.name.common));
    } catch (error) {
      console.error(error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const addToWishlist = (country) => {
    if (wishlist.includes(country)) {
      alert("이미 위시리스트에 있는 국가입니다.");
      return;
    }
    setWishlist([...wishlist, country]);
  };

  const removeFromWishlist = (country) => {
    setWishlist(wishlist.filter((item) => item !== country));
  };

  return (
    <div className="main-layout">
      <div className="left-section">
        <h1>My Travel WishList</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="where do you want to fly out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" onClick={searchCountries}>
            <BiSearchAlt />
          </button>
        </div>
        <SearchList searchInfos={countries} addToWishlist={addToWishlist} />
      </div>
      <div className="right-section">
        <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
      </div>
    </div>
  );
};

export default SearchInfo;
