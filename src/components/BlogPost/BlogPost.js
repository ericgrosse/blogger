import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.scss';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

function BlogPost(props) {
  return (
    <div className="BlogPost">
      <Link to={`/${props.post.user.username}/${props.post._id}`} style={{ textDecoration: 'none' }}>
        <h1 className="title">{props.post.title}</h1>
      </Link>
      <p className="author">By {props.post.user.displayName} ({`@${props.post.user.username}`})</p>
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

export default BlogPost;
