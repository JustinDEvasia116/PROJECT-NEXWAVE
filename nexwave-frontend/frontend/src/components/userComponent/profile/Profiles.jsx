import './Profiles.css';
import React, { useState, useEffect, useRef } from 'react';
// import settingsIcon from '../../../assets/settingsIcon.svg';

const Profiles = () => {
    // Assuming the user's mobile number is fetched from data or state
    const userMobileNumber = "1234567890";

    const handleLogout = () => {
        // Handle logout logic here
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
                        <p>{userMobileNumber}</p>
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
                            <h1>2.5 GB</h1>
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
                            <h2>Rs 249-1M-1.5/D</h2>
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
                                <h3>2.5 GB/Day</h3>
                            </div>
                        </div>
                        <hr className="plan-card-divider" />
                        <div className="plan-card-section">
                            <div className="plan-card-left">
                                <h3>Voice</h3>
                            </div>
                            <div className="plan-card-right">
                                <h3>Unlimited</h3>
                            </div>
                        </div>
                        <hr className="plan-card-divider" />
                        <div className="plan-card-section">
                            <div className="plan-card-left">
                                <h3>SMS</h3>
                            </div>
                            <div className="plan-card-right">
                                <h3>100 sms/Day</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profile-right'>

                    <div className="recharge-bar">Recharge</div>
                    <div className={`recharge-bar ${dropdownStates[0] ? 'active' : ''}`}
                        onClick={() => toggleDropdown(0)}
                        style={{ marginBottom: activeDropdown === 0 ? '160px' : '0' }}
                    >

                        Recharge
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
                        style={{ marginBottom: activeDropdown === 1 ? '160px' : '0' }}
                    >
                        Recharge
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
                    <div className="recharge-bar">Recharge</div>
                

                </div>
            </div>
        </div>
    );
};

export default Profiles;