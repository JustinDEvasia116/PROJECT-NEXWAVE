import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [otpMode, setOtpMode] = useState(false);

  const handleGenerateOTP = (e) => {
    e.preventDefault();
    setOtpMode(true);
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    // Handle OTP submission logic here
  };

  return (
    <div className="login-body">
      <div className="left-section">
        <h2>Manage your Digital Life with the MyJio app</h2>
        <div>
          <h3>Recharge, pay bills, and check balance</h3>
          <h3>Shop, UPI, and health</h3>
          <h3>Movies, music, and games</h3>
          <h3>Instant help with JioCare</h3>
        </div>
      </div>
      <div className="right-section">
        <div className="card">
          <h2>Welcome To NexWave</h2>
          <p>Log in to unlock a world of digital experiences.</p>
          {otpMode ? (
            <form onSubmit={handleSubmitOTP}>
              <div className="mob">
                <h3>Mobile</h3>
              </div>
          
              <input type="text" placeholder="Enter your OTP" />
              <button type="submit">Submit OTP</button>
            </form>
          ) : (
            <form onSubmit={handleGenerateOTP}>
              <div className="mob">
                <h3>Mobile</h3>
              </div>
              <div className="placeholder-line"></div>
              
              <input type="text" className="mobile-input" placeholder="Enter your mobile number" />
              <button type="submit">Generate OTP</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
