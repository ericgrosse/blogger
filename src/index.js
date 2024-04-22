import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from './helpers/axiosInterceptor'; // Import the axios interceptor to handle session timeouts
import toastr from 'toastr';
import reportWebVitals from './reportWebVitals';

// Import components for routing
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import CreateBlogPost from './components/CreateBlogPost/CreateBlogPost';
import EditBlogPost from './components/EditBlogPost/EditBlogPost';
import ViewBlogPost from './components/ViewBlogPost/ViewBlogPost';
import UserBlogPosts from './components/UserBlogPosts/UserBlogPosts';

// Import stylesheets
import 'toastr/build/toastr.min.css';
import './index.css';

// Set the default duration for toastr notifications
toastr.options.timeOut = 1750;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-post" element={<CreateBlogPost />} />
      <Route path="/:username/:postId/edit-post" element={<EditBlogPost />} />
      <Route path="/:username/:postId" element={<ViewBlogPost />} />
      <Route path="/:username/posts" element={<UserBlogPosts />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
