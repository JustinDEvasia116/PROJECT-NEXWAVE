import './Profiles.css';
import React, { useState, useEffect, useRef } from 'react';
import { logout } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import settingsIcon from '../../../assets/settingsIcon.svg';

const Profiles = () => {
    // Assuming the user's mobile number is fetched from data or state
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));

    useEffect(() => {
      getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/user-details/', {
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + String(authTokens.access),
            },
          });
    
          console.log('response data:', response.data);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };


    const handleLogout = () => {
        // Handle logout logic here
        dispatch(logout());
        navigate('/login');
    };
    const [dropdownStates, setDropdownStates] = useState([false, false]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
        setDropdownStates(newDropdownStates);
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <div className="profile-page">
            <div className='profile-header'>
                <div className="profile-header-left">
                    <div className="profile-info">
                        <p>{user.mob_number}</p>
                        <span>|</span>
                        <p>Prepaid</p>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
                <div className="settings-bar">
                    <p>settings</p>
                </div>
            </div>
            <div className='profile-content'>
                <div className='profile-left'>
                    <h2 className="balance-card-heading">Balance</h2>
                    <div className="balance-card">
                        <div className="balance-card-left">
                            <h3>Data Balance</h3>
                            <h1>{user.active_subscription?.plan?.data_limit} GB</h1>
                            <p>Renews in 8 Hrs</p>
                        </div>
                        <div className="balance-card-right">
                            <h3>5G Trial Unlimited</h3>
                            <h1>Unlimited</h1>
                        </div>
                    </div>
                    <h2 className="plan-card-heading">My Plans</h2>
                    <div className="plan-card">
                        <div className="plan-card-header">
                        <h2>{user.active_subscription?.plan?.name}</h2>

                            <button className="recharge-button">Recharge</button>
                        </div>
                        <div className="plan-card-details">
                            <p>expiry date</p>
                        </div>
                        <hr className="plan-card-divider" />
                        <div className="plan-card-section">
                            <div className="plan-card-left">
                                <h3>Data</h3>
                            </div>
                            <div className="plan-card-right">
                            <h3>{user.active_subscription?.plan?.data_limit} GB/Day</h3>
                            </div>
                        </div>
                        <hr className="plan-card-divider" />
                        <div className="plan-card-section">
                            <div className="plan-card-left">
                                <h3>Voice</h3>
                            </div>
                            <div className="plan-card-right">
                            <h3>{user.active_subscription?.plan?.voice_limit} mins</h3>
                            </div>
                        </div>
                        <hr className="plan-card-divider" />
                        <div className="plan-card-section">
                            <div className="plan-card-left">
                                <h3>SMS</h3>
                            </div>
                            <div className="plan-card-right">
                            <h3>{user.active_subscription?.plan?.sms_limit} sms/Day</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profile-right'>

                    <div className="recharge-bar">
                        <a style={{ textDecoration: 'none' }} href="/recharge">
                            Recharge
                        </a>
                    </div>
                    <div className={`recharge-bar ${dropdownStates[0] ? 'active' : ''}`}
                        onClick={() => toggleDropdown(0)}
                        style={{ marginBottom: activeDropdown === 0 ? '260px' : '1rem' }}
                    >

                        Recharge History
                        {dropdownStates[0] && (
                            <div className="dropdown-menu">
                                <ul>
                                    {/* Add your dropdown menu items here */}
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={`recharge-bar ${dropdownStates[1] ? 'active' : ''}`}
                        onClick={() => toggleDropdown(1)}
                        style={{ marginBottom: activeDropdown === 1 ? '260px' : '1rem' }}
                    >
                        Invoice History
                        {dropdownStates[1] && (
                            <div className="dropdown-menu">
                                <ul>
                                    {/* Add your dropdown menu items here */}
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </div>
                        )}
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Profiles;