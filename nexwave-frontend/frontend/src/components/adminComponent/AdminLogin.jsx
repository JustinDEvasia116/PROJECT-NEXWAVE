import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { adminLogin } from '../../features/auth/authSlice';
import './AdminLogin.css'

function AdminLogin(props) {
    const navigate = useNavigate();
    const isAdmin = useSelector((state) => state.auth.isAdmin);
   
    useEffect(() => {
      if (isAdmin) {
        navigate('/admins');
      }
    }, [isAdmin,navigate]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const form = event.target;
      const formData = new FormData(form);
  
      try {
        const response = await props.adminLogin (formData.get('username'), formData.get('password'));
        console.log('response: ', response);
        if (response.status === 200) {
          // Authentication succeeded
          navigate('/admins');
        } else {
          // Authentication failed
          alert('Failed to authenticate. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error);
      }
    };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
}
const mapDispatchToProps = {
    adminLogin
};
export default connect(null, mapDispatchToProps)(AdminLogin);
