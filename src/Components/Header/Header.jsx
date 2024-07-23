import React from 'react';
import './header.css';
// import Header from "./Header.jsx";
import {Link} from 'react-router-dom' 

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">Crypto World</div>
      <div className="header-search">
        <input type="text" placeholder="Search For a Crypto Currency..." className='header-input' />
        <button className="header-button">Search</button>
      </div>
      <div className="header-actions">
        <select className="header-currency-selector">
          <option value="INR">INR</option>
        </select>
        <button className="header-login-button"> <Link to='/Login'>Login</Link> </button>
      </div>
    </header>
  );
};

export default Header;
