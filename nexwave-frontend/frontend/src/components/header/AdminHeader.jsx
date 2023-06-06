import React, { useState,useCallback  } from 'react';
import './AdminHeader.css';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';



const AdminHeader = ({handleNavItemClick,activeNavItem}) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/admins";
    
  };

  return (
    <header className="admin-header">
      <h1 className="admin-header__title">Admin Dashboard</h1>
      <nav className="admin-header__nav">
        <ul className="admin-header__list">
          <li
            className={`admin-header__item ${activeNavItem === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`admin-header__item ${activeNavItem === 'pending-connections' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('pending-connections')}
          >
            New Connections
          </li>
          <li
            className={`admin-header__item ${activeNavItem === 'user-management' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('user-management')}
          >
            User Management
          </li>
          <li
            className={`admin-header__item ${activeNavItem === 'recharge-plans' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('recharge-plans')}
          >
            Recharge Plans
          </li>
          <li
            className={`admin-header__item ${activeNavItem === 'subscriptions' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('subscriptions')}
          >
            Subscriptions
          </li>
          <li
            className={`admin-header__item ${activeNavItem === 'billing-payments' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('billing-payments')}
          >
            Billing and Payments
          </li>
          <li
            className={`admin-header__item ${activeNavItem === 'reports-analytics' ? 'active' : ''}`}
            onClick={() => handleNavItemClick('reports-analytics')}
          >
            Reports and Analytics
          </li>
        </ul>
      </nav>
      <button className="admin-header__logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
