import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="body">
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
          <div className='mob'>
          <h3>Mobile</h3>
          </div>
          <form>
            <input type="text" placeholder="Enter your mobile number" />
            <button type="submit">Generate OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
