import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { APIBase } from '../../helpers/APIHelper';
import './CreateBlogPost.scss';

function CreateBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const navigate = useNavigate();

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

      console.log('Blog post created successfully:', response.data);

      const { user: { username }, _id } = response.data.blogPost;

      // Navigate to viewing the created blog post
      navigate(`/${username}/${_id}`);

    } catch (error) {
      console.error('Error creating blog post:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="CreateBlogPost">
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="form-container">
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

          <button type="submit">Submit</button>
        </div>

        <div className="preview-container">
          <p className="preview">Preview:</p>
          <div className="markdown-preview">
            <h1 className="title">{formData.title}</h1>
            <ReactMarkdown>{formData.content}</ReactMarkdown>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateBlogPost;
