import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 필요하면 스타일링 파일 추가

function Header() {
  return (
    <header className="header">
      <h1>My Services</h1>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Karaoke Search</Link>
          </li>
          <li>
            <Link to="/reliclist">Relic List</Link>
          </li>
          <li>
            <Link to="/books">Book List</Link>
          </li>
          <li>
            <Link to="/recipeList">Recipe List</Link>
          </li>
          <li>
            <Link to="/foodManage">Food Manage</Link>
          </li>
          <li>
            <Link to="/searchInfo">Search Info</Link>
          </li>
          <li>
            <Link to="/newsList2">News List</Link>
          </li>
          <li>
            <Link to="/mymusiclist">My Music List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
