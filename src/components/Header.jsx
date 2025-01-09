import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 필요하면 스타일링 파일 추가

function Header() {
  return (
    <header className="header">
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }} >My Services</Link>
      </h1>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/search">노래방 번호 및 가사 검색</Link>
          </li>
          <li>
            <Link to="/reliclist">e뮤지엄 소장품 조회</Link>
          </li>
          <li>
            <Link to="/books">Book List</Link>
          </li>
          <li>
            <Link to="/recipeList">레시피 조회</Link>
          </li>
          <li>
            <Link to="/foodManage">Food Management</Link>
          </li>
          <li>
            <Link to="/searchInfo">My Travel WishList</Link>
          </li>
          <li>
            <Link to="/newsList2">뉴스 조회</Link>
          </li>
          <li>
            <Link to="/mymusiclist">음악 조회</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
