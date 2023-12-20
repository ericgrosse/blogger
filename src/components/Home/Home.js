import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';

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
      <h1>Blogger</h1>
      {topPosts.length > 0 && (
        <div>
          <h2>Top Posts:</h2>
          <ul>
            {topPosts.map((post) => (
              <li key={post._id}>
                <strong>Title:</strong> 
                <Link to={`/${post.user.handle}/${post._id}`}>
                  {post.title}
                </Link>
                <br />
                <strong>Author:</strong> {post.user.displayName} {`@${post.user.handle}`}<br />
                <strong>Content:</strong> {post.content}<br />
                <strong>View Count:</strong> {post.viewCount}<br />
                <strong>Date Published:</strong> {new Date(post.datePublished).toLocaleString()}<br />
                <strong>Date Last Edited:</strong> {new Date(post.dateLastEdited).toLocaleString()}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
