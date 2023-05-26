import './PendingConections.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaBan, FaCheck, FaTrash } from 'react-icons/fa';

function PendingConnections() {
  const [connections, setConnections] = useState([]);
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  
  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      console.log("AuthTokens: ",authTokens.access)
      const response = await axios.get('http://127.0.0.1:8000/admins/pending-connections/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      console.log('response data:', response.data);
      setConnections(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='pendings'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username"
          />
        </div>
      </div>
      <h1>Pending Connections</h1>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Name</th>
            <th>Connection Type</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <tr key={connection.id}>
              <td>{connection.id}</td>
              <td>{connection.profile_name}</td>
              <td>{connection.connection_type}</td>
              <td>{connection.mob_number}</td>
              <td>
                {`${connection.address.street}, ${connection.address.city}, ${connection.address.state}, ${connection.address.zip_code}`}
              </td>
              <td>{connection.status}</td>
              <td style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="approve-button">
                  Approve
                </button>
                <button className="reject-button">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PendingConnections;
