import React, { useState, useEffect } from 'react';

function App() {
  const [topPosts, setTopPosts] = useState([]);

  const fetchTopPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/top-posts');
      const data = await response.json();
      setTopPosts(data.topPosts);
      console.log('Top Posts:', data.topPosts);
    } catch (error) {
      console.error('Error fetching top posts:', error);
    }
  };

  useEffect(() => {
    // Fetch top 10 posts when the component mounts
    fetchTopPosts();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className="App">
        <h1>Blogger</h1>
        {topPosts.length > 0 && (
          <div>
            <h2>Top Posts:</h2>
            <ul>
              {topPosts.map((post) => (
                <li key={post._id}>
                  <strong>Title:</strong> {post.title}<br />
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

export default App;
