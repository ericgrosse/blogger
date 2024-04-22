import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from '../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import './ViewBlogPost.scss';

function ViewBlogPost() {
  const [blogPost, setBlogPost] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { username, postId } = useParams();
  const navigate = useNavigate();

  const getBlogPost = async () => {
    try {
      const response = await axios.get(`${APIBase}/${username}/blog-posts/${postId}`);
      const data = response.data;
      setBlogPost(data.blogPost);
    } catch (error) {
      if (error.response.status !== 401) {
        toastr.error(`Error getting top posts: ${error.response.data.error}`);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      await axios.delete(`${APIBase}/blog-posts/${postId}`, { headers });
      toastr.success('Blog post successfully deleted');
      setDeleteModalOpen(false);
      setSelectedPost(null);

      // Navigate to UserBlogPosts component
      navigate(`/${blogPost.user.username}/posts`);

    } catch (error) {
      if (error.response.status !== 401) {
        toastr.error(`Error deleting blog post: ${error.response.data.error}`);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedPost(null);
  };

  const handleOpenDeleteModal = (postId) => {
    setSelectedPost(postId);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    // Get the blog post when the component mounts
    getBlogPost();
  }, []);

  return (
    <div className="ViewBlogPost">
      {blogPost && blogPost.user && (
        <>
          <BlogPost post={blogPost} onDelete={handleDeletePost} />

          <ConfirmDeleteModal
            title="Delete Blog Post"
            post={blogPost}
            isOpen={deleteModalOpen && selectedPost === blogPost._id}
            onClose={handleCancelDelete}
            onDelete={handleDeletePost}
          />
        </>
      )}
    </div>
  );
}

export default ViewBlogPost;
