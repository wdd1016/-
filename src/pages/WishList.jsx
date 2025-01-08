import React from "react";
import { FaTrash } from "react-icons/fa";
import "./WishList.css";
const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <>
      <h2>WishList</h2>
      <ul className="wishlist">
        {wishlist.map((country, index) => (
          <li key={index}>
            {country}
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
