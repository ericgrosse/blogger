import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewBlogPost.scss';

function ViewBlogPost() {
  const [blogPost, setBlogPost] = useState([]);
  const { handle, postId } = useParams();

  const getBlogPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${handle}/blog-posts/${postId}`);
      const data = response.data;
      setBlogPost(data.blogPost);
    } catch (error) {
      console.error('Error fetching top posts:', error);
    }
  };

  useEffect(() => {
    // Get the blog post when the component mounts
    getBlogPost();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className="BlogPost">
      <h1>Blog Post</h1>
      {blogPost && blogPost.user && (
        <div>
          <strong>Author:</strong> {blogPost.user.displayName} {`@${blogPost.user.handle}`}<br />
          <strong>Content:</strong> {blogPost.content}<br />
          <strong>View Count:</strong> {blogPost.viewCount}<br />
          <strong>Date Published:</strong> {new Date(blogPost.datePublished).toLocaleString()}<br />
          <strong>Date Last Edited:</strong> {new Date(blogPost.dateLastEdited).toLocaleString()}<br />
        </div>
      )}
    </div>
  );
}

export default ViewBlogPost;
