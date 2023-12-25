import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
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
      const response = await axios.post('http://localhost:5000/api/user/login', formData);

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
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email or Username:
          <input type="text" name="identifier" value={formData.identifier} onChange={handleChange} />
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

export default Login;
