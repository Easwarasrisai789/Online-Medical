import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css'; // Optional: Add styles for admin page

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all users when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data. Please try again.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user by ID
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Update the user list
      setSuccess('User deleted successfully.');
      setError('');
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="admin-container">
      <h2>User Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  {/* Add more buttons for actions like Edit, View details, etc. */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default Admin;
