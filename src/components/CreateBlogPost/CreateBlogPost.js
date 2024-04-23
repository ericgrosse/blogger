import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import ReactMarkdown from 'react-markdown';
import { APIBase } from '../../helpers/APIHelper';
import './CreateBlogPost.scss';

function CreateBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // Verify login in order to handle session expirations
    verifyLogin();
  }, []);

  const navigate = useNavigate();

  const verifyLogin = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    await axios.post(`${APIBase}/verify-login`, { token })
    .catch((error) => {
      if (error.response.status !== 401) {
        console.error(error.response.data.error);
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Set the Authorization header
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      // Make the POST request
      const response = await axios.post(`${APIBase}/blog-posts`, formData, { headers });
      const { user: { username }, _id } = response.data.blogPost;
      
      toastr.success('Blog post successfully created');
      
      // Navigate to viewing the created blog post
      navigate(`/${username}/${_id}`);

    } catch (error) {
      if (error.response.status !== 401) {
        toastr.error(`Error creating blog post: ${error.response.data.error}`);
      }
    }
  };

  const handleCancelSubmit = () => {
    navigate('/');
  };

  const isSubmitDisabled = !formData.title || !formData.content;

  return (
    <div className="CreateBlogPost">
      <h1>Create Blog Post</h1>
      <div className="form-container">
        <div className="form-inputs">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />

          <button onClick={handleCancelSubmit}>Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitDisabled}>Publish</button>
        </div>

        <div className="preview-container">
          <p className="preview">Preview:</p>
          <div className="markdown-preview">
            <h1 className="title">{formData.title}</h1>
            <ReactMarkdown>{formData.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlogPost;
