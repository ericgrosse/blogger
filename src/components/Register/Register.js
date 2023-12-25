import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';

function Register() {
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formData);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      console.log('Registration successful:', response.data);
      
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration error (e.g., display an error message)
    }
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
