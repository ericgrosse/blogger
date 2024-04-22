import React from 'react';
import './SortControls.scss';

function SortControls({ sortBy, sortOrder, onSortChange, onOrderChange }) {
  return (
    <div className="SortControls">
      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" value={sortBy} onChange={onSortChange}>
        <option value="views">Views</option>
        <option value="datePublished">Date Published</option>
        <option value="dateEdited">Date Edited</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="sortOrder">Order:</label>
      <select id="sortOrder" value={sortOrder} onChange={onOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortControls;
