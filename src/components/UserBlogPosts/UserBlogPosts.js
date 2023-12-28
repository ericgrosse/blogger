import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from './../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import './UserBlogPosts.scss';

function UserBlogPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const { username } = useParams();
  const storedUsername = localStorage.getItem('username');
  const navigate = useNavigate();

  const getUserBlogPosts = async () => {
    try {
      const response = await axios.get(`${APIBase}/${username}/blog-posts`);
      const data = response.data;
      setUserPosts(data.blogPosts);
    } catch (error) {
      toastr.error(`Error getting top posts: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    getUserBlogPosts();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

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
              <BlogPost key={post._id} post={post} />
            ))}
        </div>
      )}
    </div>
  );
}

export default UserBlogPosts;
