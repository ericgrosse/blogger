import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import { APIBase } from '../../helpers/APIHelper';
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
      const response = await axios.post(`${APIBase}/login`, formData);

      // Store the token and username in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);

      toastr.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      if (error.response.status !== 401) {
        toastr.error(`Error during registration: ${error.response.data.error}`);
      }
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
