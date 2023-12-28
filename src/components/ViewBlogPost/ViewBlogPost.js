import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from '../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import './ViewBlogPost.scss';

function ViewBlogPost() {
  const [blogPost, setBlogPost] = useState([]);
  const { username, postId } = useParams();

  const getBlogPost = async () => {
    try {
      const response = await axios.get(`${APIBase}/${username}/blog-posts/${postId}`);
      const data = response.data;
      setBlogPost(data.blogPost);
    } catch (error) {
      toastr.error(`Error getting top posts: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    // Get the blog post when the component mounts
    getBlogPost();
  }, []);

  return (
    <div className="ViewBlogPost">
      {blogPost && blogPost.user && (
        <BlogPost post={blogPost} />
      )}
    </div>
  );
}

export default ViewBlogPost;
