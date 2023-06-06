import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const AdminPrivateRoute = ({ element, ...rest }) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const accessToken = authTokens && authTokens.access;
  const isAdmin = accessToken && jwt_decode(accessToken).is_admin;
  return isAdmin ? (
    <Routes>
      <Route path="/" element={element} />
    </Routes>
  ) : (
    <Navigate to="/admins/login" replace />
  );
};
export default AdminPrivateRoute;
