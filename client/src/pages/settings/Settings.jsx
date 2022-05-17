import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import './settings.css'
import axios from 'axios'

export default function Settings() {
  const { user } = useContext(Context);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setFile(user.avatar);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file)
      updatedUser.avatar = fileName;
      try {
        const res1 = await axios.post('http://localhost:3001/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.put('http://localhost:3001/user/' + user._id, updatedUser);
      res.data && window.location.replace('/');
    } catch (err) {}
  }

  return (
    <div className="settings">
        <div className="settings-title">Update your account</div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings-profile">
            <img
              src={user.avatar ? 'http://localhost:3001/images/' + user.avatar : '../images/default-avatar.jpg'}
              alt=""
              className='settings-profile-img'
            />
            <label htmlFor="file-input">
              <i class="fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            className='write-input'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            className='write-input'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password?"
            className='write-input'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settings-submit" type="submit">Update</button>
        </form>
    </div>
  )
}