import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const PrivateRoute = ({ element, ...rest }) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const accessToken = authTokens && authTokens.access;
  const isUser = accessToken && jwt_decode(accessToken).is_user;
  return isUser ? (
    <Routes>
      <Route path="/" element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
