import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from './../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import './Home.scss';

function Home() {
  const [topPosts, setTopPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  const getTopPosts = async () => {
    try {
      const response = await axios.get(`${APIBase}/top-posts`);
      const data = response.data;
      setTopPosts(data.topPosts);
    } catch (error) {
      toastr.error(`Error getting top posts: ${error.response.data.error}`);
    }
  };

  const getLatestPosts = async () => {
    try {
      const response = await axios.get(`${APIBase}/latest-posts`);
      const data = response.data;
      setLatestPosts(data.latestPosts);
    } catch (error) {
      toastr.error(`Error getting latest posts: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    // Get top 3 posts when the component mounts
    getTopPosts();
    // Also get latest posts sorted by dateLastPublished
    getLatestPosts();
  }, []);

  return (
    <div className="Home">
      {topPosts.length > 0 && (
        <div>
          <h1 className="top-posts">Top Posts</h1>
            {topPosts.map((post) => (
              <BlogPost key={post._id} post={post} editable={false} />
            ))}
          <h1 className="latest-posts">Latest Posts</h1>
            {latestPosts.map((post) => (
              <BlogPost key={post._id} post={post} editable={false} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
