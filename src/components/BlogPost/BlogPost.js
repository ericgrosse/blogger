import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BlogPost.scss';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

function BlogPost(props) {
  const navigate = useNavigate();
  const isCurrentUser = localStorage.getItem('username') === props.post.user.username;

  const handleEditBlogPost = () => {
    navigate(`/${props.post.user.username}/${props.post._id}/edit-post`);
  };

  const handleDeleteBlogPost = () => {
    console.log('Todo');
  };

  return (
    <div className="BlogPost">
      {isCurrentUser && props.editable && (
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
        <Link to={`/${props.post.user.username}/${props.post._id}`} style={{ textDecoration: 'none' }}>
          <h1 className="title">{props.post.title}</h1>
        </Link>
      </div>
      <div>
        <Link to={`/${props.post.user.username}/posts`} style={{ textDecoration: 'none' }}>
          <p className="author">By {props.post.user.displayName} ({`@${props.post.user.username}`})</p>
        </Link>
      </div>
      <p className="date-published">Date Published: {new Date(props.post.datePublished).toLocaleString()}</p>
      {props.post.dateLastEdited && (
        <p className="date-edited">Date Last Edited: {new Date(props.post.dateLastEdited).toLocaleString()}</p>
      )}
      <div className="markdown">
        <ReactMarkdown>{props.post.content}</ReactMarkdown>
      </div>
      <p className="view-count"><FontAwesomeIcon icon={faEye} /> {props.post.viewCount}</p>
    </div>
  );
}

BlogPost.defaultProps = {
  editable: true
};

export default BlogPost;
