import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.scss';

const Modal = ({ title, isOpen, onClose, modalType }) => {
  const [newDisplayName, setNewDisplayName] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [confirmOldEmail, setConfirmOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmOldPassword, setConfirmOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Reset input fields
  const resetInputFields = () => {
    setNewDisplayName('');
    setOldEmail('');
    setConfirmOldEmail('');
    setNewEmail('');
    setOldPassword('');
    setConfirmOldPassword('');
    setNewPassword('');
  };

  useEffect(() => {
    // Reset input fields when the modal is opened
    resetInputFields();
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Set the Authorization header
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      if (modalType === 'displayName') {
        await axios.put('http://localhost:5000/api/user/update-display-name', {
          displayName: newDisplayName
        }, { headers });
      } else if (modalType === 'email') {
        await axios.put('http://localhost:5000/api/user/update-email', {
          oldEmail,
          newEmail
        }, { headers });
      } else if (modalType === 'password') {
        await axios.put('http://localhost:5000/api/user/update-password', {
          oldPassword,
          newPassword
        }, { headers });
      }

      resetInputFields();
      onClose();

    } catch (error) {
      // Handle errors based on the type of request
      if (modalType === 'displayName') {
        console.error('Error updating display name:', error);
      } else if (modalType === 'email') {
        console.error('Error updating email:', error);
      } else if (modalType === 'password') {
        console.error('Error updating password:', error);
      }
    }
  };

  if (!isOpen) return null;

  let modalContent;
  if (modalType === 'displayName') {
    modalContent = (
      <>
        <label>New Display Name:</label>
        <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
      </>
    );
  } else if (modalType === 'email') {
    modalContent = (
      <>
        <label>Old Email:</label>
        <input type="text" value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} />
        <label>Confirm Old Email:</label>
        <input type="text" value={confirmOldEmail} onChange={(e) => setConfirmOldEmail(e.target.value)} />
        <label>New Email:</label>
        <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      </>
    );
  } else if (modalType === 'password') {
    modalContent = (
      <>
        <label>Old Password:</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        <label>Confirm Old Password:</label>
        <input type="password" value={confirmOldPassword} onChange={(e) => setConfirmOldPassword(e.target.value)} />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">{modalContent}</div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
