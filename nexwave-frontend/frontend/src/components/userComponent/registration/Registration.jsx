import React, { useState, useEffect } from 'react';

import './Registration.css';
import simcard from '../../../assets/SimcardIcon.svg';
import deliveryIcon from '../../../assets/SimcardIcon.svg';
import axios from 'axios';
import { auth } from '../../../config/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function Registration() {
    const [showOTP, setShowOTP] = useState(false);
    const [showPlanSelection, setShowPlanSelection] = useState(false);
    const [showAddressInput, setShowAddressInput] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [user, setUser] = useState(null)
    const [otp, setOtp] = useState(null)
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null)
  

    const handleGenerateOTP = async (e) => {
        e.preventDefault();
        if (!name || !/^[A-Za-z]+$/.test(name)) {
            alert('Please enter a valid name');
            return;
        }

        // Validate mobile number input
        if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
            alert('Please enter a valid mobile number');
            return;
        }

        // Add the "+91" prefix to the mobile number
        const formattedMobileNumber = "+91" + mobileNumber;
        try {
            const verifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
            setRecaptchaVerifier(verifier);
            const confirmationResult = await signInWithPhoneNumber(auth, formattedMobileNumber, recaptchaVerifier);
            setUser(confirmationResult);
            setShowOTP(true);
            setShowPlanSelection(false);
            setShowAddressInput(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (!otp || !/^\d{6}$/.test(otp)) {
            alert('Please enter a valid OTP ');
            return;
        }
        try {
            console.log(otp);
            await user.confirm(otp);
            console.log(user)
            // You can store the user details in your database here
        } catch (error) {
            console.log(error);
              alert('Incorrect OTP. Please try again.');
              return;
        }
        setShowPlanSelection(true);
        setShowOTP(false);
        setShowAddressInput(false);
    };

    const handlePlanSelection = (e) => {
        e.preventDefault();
        const selectedValue = document.querySelector('input[name="plan"]:checked').value;
        setSelectedPlan(selectedValue);
        setShowOTP(false);
        setShowPlanSelection(false);
        setShowAddressInput(true);

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const mob_number = "+91" + mobileNumber;
        console.log("mobile", mob_number);
      
        const buildingName = e.target.elements.flatHouseNo.value.trim();
        const location = e.target.elements.location.value.trim();
        const area = e.target.elements.area.value.trim();
        const pincode = e.target.elements.pincode.value.trim();
      
        if (!buildingName || !location || !area || !pincode) {
          alert('Please fill in all the required fields.');
          return;
        }
      
        const address = {
          street: buildingName,
          city: location,
          state: area,
          zip_code: pincode
        };
      
        const data = {
          mob_number,
          connection_type: selectedPlan,
          address,
          profile_name: name
        };
      
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/connections/create/', data);
      
          console.log(response.data); // Handle the response as per your requirements
      
          // Additional logic or handling for successful connection creation
        } catch (error) {
          console.log(error);
          // Handle any error that occurs during the API call
        }
      
        // Reset the form after submission
        e.target.reset();
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
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text" placeholder="Enter OTP" />
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
                                    <form onSubmit={handleSubmit}>
                                        <input type="text" name="flatHouseNo" placeholder="Flat, House No., Floor, Company" />
                                        <input type="text" name="location" placeholder="Location" />
                                        <input type="text" name="area" placeholder="Area" />
                                        <input type="text" name="pincode" placeholder="Pincode" />
                                        
                                        <button type="submit">Book SIM Delivery</button>
                                    </form>
                                </div>
                            ) : (
                                <div className='card-body'>
                                    <h2>Get a SIM</h2>
                                    <p>Just validate your number, share your address, and we'll deliver it to your doorstep for FREE</p>
                                    <form>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Mobile Number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                        <div id="recaptcha-container"></div>
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
