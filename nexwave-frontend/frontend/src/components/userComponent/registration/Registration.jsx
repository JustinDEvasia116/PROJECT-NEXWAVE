import React, { useState } from 'react';
import './Registration.css';
import simcard from '../../../assets/SimcardIcon.svg';
import deliveryIcon from '../../../assets/SimcardIcon.svg';

function Registration() {
    const [showOTP, setShowOTP] = useState(false);
    const [showPlanSelection, setShowPlanSelection] = useState(false);
    const [showAddressInput, setShowAddressInput] = useState(false);

    const handleGenerateOTP = (e) => {
        e.preventDefault();
        setShowOTP(true);
        setShowPlanSelection(false);
        setShowAddressInput(false);
    };

    const handleNext = (e) => {
        e.preventDefault();
        setShowPlanSelection(true);
        setShowOTP(false);
        setShowAddressInput(false);
    };

    const handlePlanSelection = (e) => {
        e.preventDefault();
        setShowOTP(false);
        setShowPlanSelection(false);
        setShowAddressInput(true);
    };

    return (
        <div className="registration-page">
            <div className="card">
                <div className="card-header">
                    <img src={simcard} alt="Font Awesome Icon" />
                </div>
                <div >
                    {showOTP ? (
                        <div className='card-body'>
                            <h2>Enter OTP</h2>
                            <form>
                                <input type="text" placeholder="Enter OTP" />
                                <button type="submit" onClick={handleNext}>Next</button>
                            </form>
                        </div>
                    ) : showPlanSelection ? (
                        <div className='plan'>
                            <h2>Select Plan</h2>
                            <p>Choose your plan: Prepaid or Postpaid</p>
                            <form>
                                <label>
                                    <input type="radio" name="plan" value="prepaid" />
                                    <span className="radio-label">Prepaid</span>
                                </label>
                                <label>
                                    <input type="radio" name="plan" value="postpaid" />
                                    <span className="radio-label">Postpaid</span>
                                </label>
                                <button type="submit" onClick={handlePlanSelection}>Next</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            {showAddressInput ? (
                                <div className='adress'>
                                    
                                        <h2>Deliver Here</h2>
                                        <p>Where do you want your new Jio SIM to be delivered?</p>
                                        <form>
                                            <input type="text" placeholder="Building Name" />
                                            <input type="text" placeholder="Location" />
                                            <input type="text" placeholder="Area" />
                                            <input type="text" placeholder="Pincode" />
                                            <input type="text" placeholder="Flat, House No., Floor, Company" />
                                            <button type="submit">Book SIM Delivery</button>
                                        </form>
                                    
                                </div>
                            ) : (
                                <div className='card-body'>
                                    <h2>Get a SIM</h2>
                                    <p>Just validate your number, share your address, and we'll deliver it to your doorstep for FREE</p>
                                    <form>
                                        <input type="text" placeholder="Name" />
                                        <input type="text" placeholder="Mobile Number" />
                                        <p>You will receive an OTP on your number.</p>
                                        <button type="submit" onClick={handleGenerateOTP}>Generate OTP</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Registration;
