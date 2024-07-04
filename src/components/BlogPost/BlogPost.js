import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import './BlogPost.scss';

function BlogPost({ post, editable, onDelete }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const isCurrentUser = localStorage.getItem('username') === post.user.username;

  const handleEditBlogPost = () => {
    navigate(`/${post.user.username}/${post._id}/edit-post`);
  };

  const handleDeleteBlogPost = () => {
    onDelete(post._id);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const parseYoutubeLinks = (content) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
    return content.replace(youtubeRegex, (match, p1) => {
      return `<iframe width="600" height="400" src="https://www.youtube.com/embed/${p1}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
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
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          children={parseYoutubeLinks(post.content)}
        />
      </div>
      <p className="view-count"><FontAwesomeIcon icon={faEye} /> {post.viewCount}</p>
    </div>
  );
}

BlogPost.defaultProps = {
  editable: true
};

export default BlogPost;
