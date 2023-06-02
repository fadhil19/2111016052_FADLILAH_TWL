import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import UploadForm from './UploadForm';

export default function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://express-passport-jwt-production.up.railway.app/users')
      .then((response) => response.json())
      .then((json) => setUsers(json.result));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://express-passport-jwt-production.up.railway.app/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1>List of Users</h1>
      <button onClick={() => navigate('/add')}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIM</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.nim}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.nim)}>Edit</button>
                <button onClick={() => handleDelete(user.nim)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UploadForm/>
    </div>
  );
}
