import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src="/path/to/company_logo.png" alt="Company Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/prepaid">Prepaid</a>
          </li>
          <li>
            <a href="/postpaid">Postpaid</a>
          </li>
          <li>
            <a href="/recharge">Recharge</a>
          </li>
          <li>
            <a href="/pay-bills">Pay Bills</a>
          </li>
        </ul>
      </nav>
      <div className="profile-logo">
        <img src="/path/to/profile_logo.png" alt="Profile Logo" />
      </div>
    </header>
  );
};

export default Header;
