import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateBlogPost from './components/CreateBlogPost/CreateBlogPost';
import EditBlogPost from './components/EditBlogPost/EditBlogPost';
import ViewBlogPost from './components/ViewBlogPost/ViewBlogPost';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-post" element={<CreateBlogPost />} />
      <Route path="/:username/:postId/edit-post" element={<EditBlogPost />} />
      <Route path="/:username/:postId" element={<ViewBlogPost />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
