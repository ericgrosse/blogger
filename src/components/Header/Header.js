import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faList, faPen, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleViewProfile = () => {
    console.log('Todo');
  };

  const handleViewPosts = () => {
    console.log('Todo');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const renderDropdown = () => (
    <div className="dropdown" tabIndex={0} onBlur={() => setShowDropdown(false)}>
      <div className={`user-icon ${showDropdown ? 'active' : ''}`} onClick={() => setShowDropdown(!showDropdown)}>
        <FontAwesomeIcon icon={faUser} />
          {showDropdown && (
          <div className="dropdown-content">
            <div className="dropdown-option" onClick={handleViewProfile}>
              <FontAwesomeIcon className="font-awesome-icon" icon={faUser} /> Profile
            </div>
            <div className="dropdown-option" onClick={handleViewPosts}>
              <FontAwesomeIcon className="font-awesome-icon" icon={faList} /> View Posts
            </div>
            <div className="dropdown-option" onClick={handleSignOut}>
              <FontAwesomeIcon className="font-awesome-icon" icon={faSignOutAlt} /> Sign Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="Header">
      <div className="header-left">
        <Link to="/" className="logo">Blogger</Link>
      </div>
      <div className="header-right">
        {localStorage.getItem('token') && (
          <div className="create-post" onClick={handleCreatePost}>
            <FontAwesomeIcon icon={faPen} /> Create Post
          </div>
        )}
        {localStorage.getItem('token') ? (
          renderDropdown()
        ) : (
          <>
            <span className="sign-in" onClick={handleSignIn}>Sign In</span>
            <span className="register" onClick={handleRegister}>Register</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
