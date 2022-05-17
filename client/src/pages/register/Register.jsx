import React, { useState } from 'react'
import './register.css'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('http://localhost:3001/auth/register', {
        username,
        email,
        password,
        avatar: '../images/default-avatar.jpg'
      });
      console.log(res);
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div className="register">
      <span className="register-title">Register</span>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="register-input"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="register-input"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="register-input"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      {error && <span style={{color:"red"}}>Uh oh! Something went wrong!</span>}
    </div>
  )
}
