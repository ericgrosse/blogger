import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.scss';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${username}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error (e.g., display an error message)
      }
    };

    getUserDetails();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  const handleDisplayNameChange = () => {
    console.log('Changing display name...');
  };

  const handleEmailChange = () => {
    console.log('Changing email...');
  };

  const handlePasswordChange = () => {
    console.log('Changing password...');
  };

  return (
    <div className="Profile">
      <h1 className="title">Profile</h1>
      {user && (
        <div className="profile-content">       
          <p>Display Name: {user.displayName} <button onClick={handleDisplayNameChange}>Change Display Name</button></p>
          <p>Username: @{user.username}</p>
          <p>Email: {user.email} <button onClick={handleEmailChange}>Change Email</button></p>
          <p><button className="password-button" onClick={handlePasswordChange}>Change Password</button></p>
        </div>
      )}
    </div>
  );
}

export default Profile;
