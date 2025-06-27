import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skill: '',
    location: '',
  });
  const [message, setMessage] = useState('');
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      setMessage('❌ Please select a role');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/register', {
        ...formData,
        role,
      });
      setMessage('✅ Registration successful!');
      Navigate('jobs');
      <Link to="/jobs">Jobs</Link>
    } catch (err) {
      setMessage('❌ Registration failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        {!role ? (
          <>
            <h2>Select Your Role</h2>
            <div className="role-buttons">
              <button onClick={() => setRole('worker')}>Worker</button>
              <button onClick={() => setRole('employer')}>Employer</button>
            </div>
          </>
        ) : (
          <>
            <h2>{role === 'worker' ? 'Worker' : 'Employer'} Registration</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required/>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
              {role === 'worker' && (
                <input type="text"  name="skill"  placeholder="Skill (e.g., plumber, driver)" value={formData.skill} onChange={handleChange} required/>
              )}
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required/>
              {message && (
                <div className={`reg-message ${message.startsWith('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
              <button type="submit">Register</button>
              <p className="back-role" onClick={() => setRole('')}>← Change Role</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
