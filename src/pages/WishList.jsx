import React from "react";
import { FaTrash } from "react-icons/fa";
import "./WishList.css";
const Wishlist = ({ wishlist, removeFromWishlist, setNowcountry }) => {
  return (
    <>
      <h2>WishList</h2>
      <ul className="wishlist">
        {wishlist.map((country, index) => (
          <li onClick={() => setNowcountry(country)} key={index}>
            <img src={country.flag}/>
            {country.name}
            <button onClick={() => removeFromWishlist(country)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Wishlist;
