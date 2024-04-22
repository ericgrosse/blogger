import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from '../BlogPost/BlogPost';
import Pagination from '../Pagination/Pagination';
import { APIBase } from '../../helpers/APIHelper';
import './Home.scss';

function Home() {
  const [topPosts, setTopPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Get the latest posts sorted by dateLastPublished
    getLatestPosts(currentPage);
  }, [currentPage]);

  const getLatestPosts = async (page) => {
    try {
      const response = await axios.get(`${APIBase}/latest-posts?page=${page}`);
      const data = response.data;
      setLatestPosts(data.latestPosts);
      setTotalPages(Math.ceil(data.totalPosts / 10)); // Assuming 10 items per page
    } catch (error) {
      if (error.response.status !== 401) {
        toastr.error(`Error getting latest posts: ${error.response.data.error}`);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getLatestPosts(pageNumber);
  };

  return (
    <div className="Home">            
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
          
      {latestPosts.map((post) => (
        <BlogPost key={post._id} post={post} editable={false} />
      ))}
    </div>
  );
}

export default Home;
