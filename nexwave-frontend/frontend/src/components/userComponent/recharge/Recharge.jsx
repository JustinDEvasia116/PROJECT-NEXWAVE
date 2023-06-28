import React, { useState, useEffect, useRef } from 'react';
import './recharge.css'; // Import your CSS file for recharge page styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPrice, setSelectedPlan, setSelectedNumber } from '../../../features/auth/authSlice';
import jwt_decode from 'jwt-decode';

const Recharge = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allPlans, setAllplans] = useState([]);
  const [rechargePlans, setRechargePlans] = useState([]);
  const [rechargeNum, setRechargeNum] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [inputError, setInputError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPrice = useSelector((state) => state.auth.selectedPrice);
  const selectedPlan = useSelector((state) => state.auth.selectedPlan);
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  const accessToken = authTokens && authTokens.access;
  const recharge_num = accessToken && jwt_decode(accessToken).username;

  useEffect(() => {
    setRechargeNum(recharge_num.substring(3));
  }, []);

  useEffect(() => {
    // Fetch and set the categories
    axios
      .get('http://127.0.0.1:8000/admins/categories/')
      .then((response) => {
        setCategories(response.data);
        console.log(response.data); // Log the response data
      })
      .catch((error) => console.error(error));

    // Fetch and set the recharge plans based on the selected category
    // Replace this with your own logic to fetch the data from your backend
    axios
      .get('http://127.0.0.1:8000/admins/recharge-plans/')
      .then((response) => {
        setAllplans(response.data);
        const filteredPlans = response.data.filter((plan) => plan.category === 1);
        setRechargePlans(filteredPlans);
      })
      .catch((error) => console.error(error));

    setSelectedCategory('Popular Plans');
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setRechargeNum(input);
      setInputError('');
    } else {
      setInputError('Only 10 digits are allowed.');
    }
  };

  const handlePageClick = (event) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      if (rechargeNum.length === 10) {
        setIsEditing(false);
      } else {
        setInputError('Please enter 10 digits.');
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        document.addEventListener('click', handlePageClick);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handlePageClick);
      };
    }
  }, [isEditing]);

  const parentRef = useRef(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    const filteredPlans = allPlans.filter((plan) => plan.category === category.id);
    setRechargePlans(filteredPlans);
  };

  const handleBuyButtonClick = (plan) => {
    dispatch(setSelectedPrice(plan.price));
    dispatch(setSelectedPlan(plan.id));
    dispatch(setSelectedNumber(rechargeNum));
    navigate('/payment');
  };

  return (
    <div className="recharge-container">
      <div className="recharge-left-section">
        <div className="recharge-card">
          <div className="recharge-card-content">
            <h2>Select Plan</h2>
            {isEditing ? (
              <div className="recharge-card-info" ref={parentRef}>
                <input
                  type="text"
                  value={rechargeNum}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="input-field" // Add the class name here
                />

                {inputError && <p className="input-error">{inputError}</p>}
              </div>
            ) : (
              <div className="recharge-card-info">
                {rechargeNum.length === 10 ? (
                  <p>{rechargeNum}</p>
                ) : (
                  <input
                    type="text"
                    value={rechargeNum}
                    onChange={handleInputChange}
                    maxLength={10}
                    style={{ border: 'none', outline: 'none' }}
                    readOnly
                  />
                )}
                <button className="edit-button" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
            )}

            <div className="plan-categories">
              {categories.map((category) => (
                <p key={category.id} onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recharge-right-section">
        <div className="recharge-card">
          {selectedCategory ? (
            <>
              <h2>{selectedCategory}</h2>
              {rechargePlans.length > 0 ? (
                <ul className="recharge-plans-list">
                  {rechargePlans.map((plan) => (
                    <div key={plan.id}>
                      <li>
                        <div className="plan-item">
                          <h3>Plan</h3>
                          <p>${plan.price}</p>
                        </div>
                        <div className="plan-item">
                          <h3>Validity</h3>
                          <p>{plan.validity} days</p>
                        </div>
                        <div className="plan-item">
                          <h3>Data</h3>
                          <p>{plan.data} GB</p>
                        </div>
                        <a href="#" className="view-details">
                          View Details
                        </a>
                        <button className="buy-button" onClick={() => handleBuyButtonClick(plan)}>
                          Buy
                        </button>
                      </li>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No recharge plans available for the selected category.</p>
              )}
            </>
          ) : (
            <p>Please select a category to view the recharge plans.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recharge;
