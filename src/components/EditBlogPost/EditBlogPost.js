import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import { APIBase } from '../../helpers/APIHelper';
import './EditBlogPost.scss';

function EditBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [blogPost, setBlogPost] = useState([]);
  
  const { username, postId } = useParams();
  const navigate = useNavigate();

  const getBlogPost = async () => {
    try {
      const response = await axios.get(`${APIBase}/${username}/blog-posts/${postId}`);
      const data = response.data;
      setBlogPost(data.blogPost);
      setFormData({
        title: data.blogPost.title,
        content: data.blogPost.content,
      });
    } catch (error) {
      toastr.error(`Error getting blog post: ${error.response.data.error}`);
    }
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

      // Make the PUT request
      const response = await axios.put(`${APIBase}/blog-posts/${postId}`, formData, { headers });
      const { user: { username }, _id } = response.data.blogPost;

      toastr.success('Blog post successfully updated');

      // Navigate to viewing the updated blog post
      navigate(`/${username}/${_id}`);

    } catch (error) {
      console.error(`Error updating blog post: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    // Get the blog post when the component mounts
    getBlogPost();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className="EditBlogPost">
      <h2>Edit Blog Post</h2>
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

export default EditBlogPost;
