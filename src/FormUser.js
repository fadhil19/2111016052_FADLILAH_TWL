import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    
  });

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle API response
      console.log(data);
      navigate('/')
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormUser;
