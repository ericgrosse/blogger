import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import BlogPost from '../BlogPost/BlogPost';
import Pagination from '../Pagination/Pagination';
import SortControls from '../SortControls/SortControls';
import { APIBase } from '../../helpers/APIHelper';
import './Home.scss';

function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('views'); // Default sort by Views
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order descending

  useEffect(() => {
    getLatestPosts(currentPage, sortBy, sortOrder);
  }, [currentPage, sortBy, sortOrder]);

  const getLatestPosts = async (page, sortBy, sortOrder) => {
    try {
      const response = await axios.get(`${APIBase}/latest-posts`, {
        params: { page, sortBy, sortOrder },
      });
      const data = response.data;
      setLatestPosts(data.latestPosts);
      setTotalPages(Math.ceil(data.totalPosts / 10)); // Assuming 10 items per page
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        toastr.error(`Error getting latest posts: ${error.response.data.error}`);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="Home">
      <SortControls
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />

      {latestPosts.length > 0 && (
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          
          {latestPosts.map((post) => (
            <BlogPost key={post._id} post={post} editable={false} />
          ))}
        </div>
      )}

      {latestPosts.length === 0 && (
        <div>No latest posts available.</div>
      )}
    </div>
  );
}

export default Home;
