import React from 'react';
import toastr from 'toastr';
import { getApiErrorMessage, isUnauthorizedError } from '../../helpers/errors';
import './ConfirmDeleteModal.scss';

const ConfirmDeleteModal = ({ title, post, isOpen, onClose, onDelete }) => {
  const handleSubmit = async () => {
    try {
      await onDelete(post._id);
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        toastr.error(`Error deleting blog post: ${getApiErrorMessage(error, 'Unable to delete blog post')}`);
      }
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="ConfirmDeleteModal">
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-content">
            <p>Are you sure you want to delete this blog post?</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
