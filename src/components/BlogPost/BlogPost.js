import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import '../MarkdownContent/MarkdownContent.scss';
import './BlogPost.scss';

function BlogPost({ post, editable, onDelete }) {
  const navigate = useNavigate();
  const isCurrentUser = localStorage.getItem('username') === post.user.username;

  const handleEditBlogPost = () => {
    navigate(`/${post.user.username}/${post._id}/edit-post`);
  };

  const handleDeleteBlogPost = () => {
    onDelete(post._id);
  };

  return (
    <div className="BlogPost">
      {isCurrentUser && editable && (
        <div className="action-buttons">
          <button className="edit-button" onClick={handleEditBlogPost}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="delete-button" onClick={handleDeleteBlogPost}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      )}
      <div className="title-container">
        <Link to={`/${post.user.username}/${post._id}`} style={{ textDecoration: 'none' }}>
          <h1 className="title">{post.title}</h1>
        </Link>
      </div>
      <div>
        <Link to={`/${post.user.username}/posts`} style={{ textDecoration: 'none' }}>
          <p className="author">By {post.user.displayName} ({`@${post.user.username}`})</p>
        </Link>
      </div>
      <p className="date-published">Date Published: {new Date(post.datePublished).toLocaleString()}</p>
      {post.dateLastEdited && (
        <p className="date-edited">Date Last Edited: {new Date(post.dateLastEdited).toLocaleString()}</p>
      )}
      <div className="markdown">
        <MarkdownContent content={post.content} />
      </div>
      <p className="view-count"><FontAwesomeIcon icon={faEye} /> {post.viewCount}</p>
    </div>
  );
}

BlogPost.defaultProps = {
  editable: true
};

export default BlogPost;
