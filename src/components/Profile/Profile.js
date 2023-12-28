import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal'; // Adjust the path based on your project structure
import './Profile.scss';

function Profile() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${username}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setModalOpen(false);
  };

  return (
    <div className="Profile">
      <h1 className="title">Profile</h1>
      {user && (
        <div className="profile-content">       
          <p>Display Name: {user.displayName} <button onClick={() => openModal('displayName')}>Change Display Name</button></p>
          <p>Username: @{user.username}</p>
          <p>Email: {user.email} <button onClick={() => openModal('email')}>Change Email</button></p>
          <p><button className="password-button" onClick={() => openModal('password')}>Change Password</button></p>
        </div>
      )}

      <Modal
        title="Change Details"
        isOpen={modalOpen}
        onClose={closeModal}
        modalType={modalType}
      />
    </div>
  );
}

export default Profile;