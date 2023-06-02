import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FormEdit() {
  const { id } = useParams(); // get the ID of the user to edit from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  
  
  useEffect(() => {
    fetch(`https://express-passport-jwt-production.up.railway.app/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setFormData(prevFormData => ({ ...prevFormData, ...data.result[0] })); // merge the fetched data with the current form data
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://express-passport-jwt-production.up.railway.app/users/${id}`, { // make a PUT request to update the data
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/');
    })
    .catch(error => {
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

export default FormEdit;
