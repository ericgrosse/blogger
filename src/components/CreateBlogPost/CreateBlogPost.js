import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:5000/api/user/blog-posts', formData, { headers });

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
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export default CreateBlogPost;
