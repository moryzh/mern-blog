import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router'
import './postView.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';

export default function PostView() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState([]);
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('http://localhost:3001/post/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    fetchPost();
  }, [path]);

  const handleDelete = async (e) => {
    try {
      const res = await axios.delete('http://localhost:3001/post/' + path, {
        data: {username: user.username}
      });
      res.data && window.location.replace('/');
    } catch (err) { }
  };

  const handleUpdate = async (e) => {
    try {
      const res = await axios.put('http://localhost:3001/post/' + path, {
        username: user.username,
        title,
        desc
      });
      res.data && setUpdateMode(false);
    } catch (err) { }
  };

  return (
    <div className='post-view'>
      <img src={post.background ? "http://localhost:3001/images/" + post.background : "../images/default-post-img.jpg"} alt="[post-view-img]" className="post-view-img" />
      {updateMode ? 
        <input className='post-view-title' type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      :
        <>
          <div className="post-view-title">{title}</div>
          {post.username == user?.username && 
            <div className="post-view-buttons">
              <i className="fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
              <i className="fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
          }
        </>
      }
      <div className="post-view-author">Written by: <Link className='link' to={'/?username=' + post.username}>{post.username}</Link></div>
      <div className="post-view-date">{new Date(post.createdAt).toDateString()}</div>
      {updateMode ? 
        <>
          <textarea className='post-view-text' value={desc} onChange={(e) => setDesc(e.target.value)} ></textarea>
          <button className="post-view-update" onClick={handleUpdate}>Update</button>
        </>
      :
        <div className="post-view-text">{desc}</div>
      }
    </div>
  )
}
