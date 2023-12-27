import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';
import BlogPost from './../BlogPost/BlogPost';

function Home() {
  const [topPosts, setTopPosts] = useState([]);

  const getTopPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/top-posts');
      const data = response.data;
      setTopPosts(data.topPosts);
    } catch (error) {
      console.error('Error fetching top posts:', error);
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
