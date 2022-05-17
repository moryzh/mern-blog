import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './sidebar.css'

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get('http://localhost:3001/category');
      setCats(res.data);
    }
    fetchCats();
  }, []);

  return (
    <div className='sidebar'>
      <div className="sidebar-intro">username: {user.username}</div>
      <img src={user.avatar ? 'http://localhost:3001/images/' + user.avatar : '../images/default-avatar.jpg'} alt="[profile-img]" className="sidebar-profile-img" />
      <div className="sidebar-cat-list">
        {cats.map((cat) => (
          <div key={cat._id} className="sidebar-cat-item"><Link className='link' to={'/?cat=' + cat.name}>{cat.name}</Link></div>
        ))}
      </div>
      <div className="sidebar-sm-list">
        <i className="fa-brands sidebar-sm-item fa-pinterest-square"></i>
        <i className="fa-brands sidebar-sm-item fa-youtube"></i>
        <i className="fa-brands sidebar-sm-item fa-facebook-square"></i>
        <i className="fa-brands sidebar-sm-item fa-github-square"></i>
        <i className="fa-brands sidebar-sm-item fa-snapchat-square"></i>
        <i className="fa-brands sidebar-sm-item fa-instagram-square"></i>
      </div>
    </div>
  )
}
