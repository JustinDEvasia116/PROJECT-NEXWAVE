
import './PendingConections.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { FaBan, FaCheck, FaTrash } from 'react-icons/fa';

function PendingConnections() {

  
  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username"
        />
      </div>
    </div>
    <h1>User Details</h1>
    <br />
    <br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Status</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* User data rows */}
        <tr>
          <td>{/* User ID */}</td>
          <td>{/* User username */}</td>
          <td>{/* User first name */}</td>
          <td>{/* User last name */}</td>
          <td>{/* User email */}</td>
          <td>{/* User status (Active/Inactive) */}</td>
          <td style={{ display: 'flex', alignItems: 'center' }}>
            <button className="block-button">
              {/* Block/Unblock button */}
            </button>
            <button className="delete-button">
              <FaTrash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default PendingConnections