import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from './../BlogPost/BlogPost';
import { APIBase } from '../../helpers/APIHelper';
import './Home.scss';

function Home() {
  const [topPosts, setTopPosts] = useState([]);

  const getTopPosts = async () => {
    try {
      const response = await axios.get(`${APIBase}/top-posts`);
      const data = response.data;
      setTopPosts(data.topPosts);
    } catch (error) {
      toastr.error(`Error getting top posts: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    // Fetch top 10 posts when the component mounts
    getTopPosts();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className="Home">
      {topPosts.length > 0 && (
        <div>
          <h1 className="top-posts">Top Posts</h1>
            {topPosts.map((post) => (
              <BlogPost key={post._id} post={post} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
