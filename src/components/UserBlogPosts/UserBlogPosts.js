import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from './../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { getApiErrorMessage, isUnauthorizedError } from '../../helpers/errors';
import './UserBlogPosts.scss';

function UserBlogPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { username } = useParams();
  const storedUsername = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const getUserBlogPosts = useCallback(async () => {
    try {
      await axios.post(`${APIBase}/verify-login`, { token }); // handles session timeouts
      const response = await axios.get(`${APIBase}/${username}/blog-posts`);
      setUserPosts(response.data.blogPosts);
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        toastr.error(`Error getting posts: ${getApiErrorMessage(error, 'Unable to load posts')}`);
      }
    }
  }, [token, username]);

  useEffect(() => {
    getUserBlogPosts();
  }, [getUserBlogPosts]);

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
      // Get user blog posts again after deletion
      getUserBlogPosts();
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        toastr.error(`Error deleting blog post: ${getApiErrorMessage(error, 'Unable to delete blog post')}`);
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

  return (
    <div className="UserBlogPosts">
      {userPosts.length === 0 && (
        <>
          <h1 className="posts-by-user">No Posts Yet</h1>
          {username === storedUsername && (
            <div className="button-container">
              <button onClick={() => navigate('/create-post')}>Create Post</button>
            </div>
          )}
        </>
      )}

      {userPosts.length > 0 && (
        <div>
          <h1 className="posts-by-user">Posts by {userPosts[0].user.displayName} (@{userPosts[0].user.username})</h1>
            {userPosts.map((post) => (
              <React.Fragment key={post._id}>
                <BlogPost post={post} onDelete={handleOpenDeleteModal} />
                <ConfirmDeleteModal
                  title="Delete Blog Post"
                  post={post}
                  isOpen={deleteModalOpen && selectedPost === post._id}
                  onClose={handleCancelDelete}
                  onDelete={handleDeletePost}
                />
            </React.Fragment>
            ))}
        </div>
      )}
    </div>
  );
}

export default UserBlogPosts;
