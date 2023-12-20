import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogPost.scss';

function BlogPost() {
  const [blogPost, setBlogPost] = useState([]);
  const { postId } = useParams();

  const getBlogPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/blog-posts/${postId}`);
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
    </div>
  );
}

export default BlogPost;
