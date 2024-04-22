import React from 'react';
import './Pagination.scss';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate an array of page numbers from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="Pagination">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
