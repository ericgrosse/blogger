import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import Modal from '../Modal/Modal';
import { APIBase } from '../../helpers/APIHelper';
import './Profile.scss';

function Profile() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const getUserDetails = async () => {
    const username = localStorage.getItem('username');
    try {
      const response = await axios.get(`${APIBase}/${username}`);
      setUser(response.data.user);
    } catch (error) {
      toastr.error(`Error getting user details: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setModalOpen(false);
    getUserDetails(); // Refresh the user details in case any user property has been updated
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
