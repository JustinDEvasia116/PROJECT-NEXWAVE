import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RechargePlans.css';

function RechargePlans() {
  const [plans, setPlans] = useState([]);
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  useEffect(() => {
    getPlanDetails();
  }, []);

  const getPlanDetails = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/admins/recharge-plans/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      console.log('response data:', response.data);
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recharge-plans-container">
      <h2 className="recharge-plans-heading">Recharge Plans</h2>
      <table className="recharge-plans-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Data Limit</th>
            <th>Voice Limit</th>
            <th>SMS Limit</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.data_limit}</td>
              <td>{plan.voice_limit}</td>
              <td>{plan.sms_limit}</td>
              <td>${plan.price}</td>
              <td>{plan.category}</td>
              <td>
                <button onClick={() => handleDeletePlan(plan.id)} className="recharge-plans-action-btn">
                  Delete
                </button>
                <button className="recharge-plans-action-btn">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RechargePlans;
