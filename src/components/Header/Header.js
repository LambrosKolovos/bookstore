import React from "react";
import "./_header.scss";
import { Link } from "react-router-dom";
import headerlogo from "../../assets/headerlogo.png";

function Header() {
  return (
    <div className="header__container">
      <div className="header__left">
        <div className="header__logo">
          <img src={headerlogo} width="160px" />
        </div>
        <Link to="/search" className="header__left-search link">
          Search
        </Link>
      </div>
      <Link to="/add" className="header__right link">
        Add book
      </Link>
    </div>
  );
}

export default Header;
