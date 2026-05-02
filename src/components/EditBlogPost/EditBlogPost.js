import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import { APIBase } from '../../helpers/APIHelper';
import { getApiErrorMessage, isUnauthorizedError } from '../../helpers/errors';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import '../MarkdownContent/MarkdownContent.scss';
import './EditBlogPost.scss';

function EditBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const { username, postId } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const getBlogPost = useCallback(async () => {
    try {
      await axios.post(`${APIBase}/verify-login`, { token }); // handles session timeouts
      const response = await axios.get(`${APIBase}/${username}/blog-posts/${postId}`);
      const data = response.data;
      setFormData({
        title: data.blogPost.title,
        content: data.blogPost.content,
      });
      setOriginalTitle(data.blogPost.title);
      setOriginalContent(data.blogPost.content);
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        toastr.error(`Error getting blog post: ${getApiErrorMessage(error, 'Unable to load blog post')}`);
      }
    }
  }, [postId, token, username]);

  useEffect(() => {
    // Get the blog post when the component mounts
    getBlogPost();
  }, [getBlogPost]);

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
      if (!isUnauthorizedError(error)) {
        toastr.error(`Error updating blog post: ${getApiErrorMessage(error, 'Unable to update blog post')}`);
      }
    }
  };

  const handleCancelSubmit = () => {
    navigate(`/${username}/${postId}`);
  };

  const isSubmitDisabled = 
    (originalTitle === formData.title) &&
    (originalContent === formData.content);

  return (
    <div className="EditBlogPost">
      <h1>Edit Blog Post</h1>
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
          <button onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
        </div>

        <div className="preview-container">
          <p className="preview">Preview:</p>
          <div className="markdown-preview">
            <h1 className="title">{formData.title}</h1>
            <MarkdownContent content={formData.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlogPost;
