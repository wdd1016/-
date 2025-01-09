import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SearchList from "./SearchList";
import Wishlist from "./WishList";
import CountryInfo from "./CountryInfo";
import "./MainLayout.css";
import "./SearchInfo.css";

const SearchInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [nowCountry, setNowcountry] = useState({});

  const searchCountries = async () => {
    if (searchTerm.trim() === "") {
      alert("Where do you want to fly to?");
      return;
    }
  
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
      if (!response.ok) {
        throw new Error("국가 정보를 가져오는 데 실패했습니다.");
      }
  
      const data = await response.json();
      var first_key = (obj)=>{
        return(
        Object.keys(obj)[0]);
      }
      const formattedCountries = data.map(country => (
        console.log(country),{
        name: country.name.common,
        flag: country.flags.svg,
        capital: country.capital[0],
        map: country.maps.googleMaps,
        region:country.region,
        lang: country.languages[first_key(country.languages)],
        cur: country.currencies[first_key(country.currencies)].symbol,
        time: country.timezones[0]
      }));
  
      
      console.log(formattedCountries);
      setCountries(formattedCountries);
  
    } catch (error) {
      console.error("오류:", error.message);
      alert("국가 정보를 가져오는 중 오류가 발생했습니다.");
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
        <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} setNowcountry={setNowcountry} />
      </div>
      <div className="right-section">
        <div>
          <CountryInfo country={nowCountry} />
        </div>
        
      </div>
    </div>
  );
};

export default SearchInfo;
