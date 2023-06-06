import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css'

function UserManagement() {
  const [users, setUsers] = useState([]);

  const authTokens = JSON.parse(localStorage.getItem('authTokens'));

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/admins/users/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      console.log('response data:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Status</th> {/* New column for user status */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.is_active ? 'Active' : 'Inactive'}</td> {/* Display the user status */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
