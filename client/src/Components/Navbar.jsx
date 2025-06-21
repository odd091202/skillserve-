import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">SkillServe</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/jobs">Jobs</a>
      </div>
    </nav>
  );
};

export default Navbar;
