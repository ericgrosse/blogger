import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import { APIBase } from '../../helpers/APIHelper';
import './ConfirmDeleteModal.scss';

const ConfirmDeleteModal = ({ title, post, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Set the Authorization header
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      await axios.delete(`${APIBase}/blog-posts/${post._id}`, { headers });
      toastr.success('Blog post successfully deleted');
      onClose();
      
      // Navigate to UserBlogPosts component
      navigate(`/${post.user.username}/posts`);

    } catch (error) {
      toastr.error(`Error deleting blog post: ${error.response.data.error}`);
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
