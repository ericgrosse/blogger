import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogPost from './../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import './UserBlogPosts.scss';

function UserBlogPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const { username } = useParams();

  const getUserBlogPosts = async () => {
    try {
      const response = await axios.get(`${APIBase}/${username}/blog-posts`);
      const data = response.data;
      setUserPosts(data.blogPosts);
    } catch (error) {
      console.error('Error fetching top posts:', error);
    }
  };

  useEffect(() => {
    getUserBlogPosts();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className="UserBlogPosts">
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
