import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import './createPost.css'

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file)
      newPost.background = fileName;
      try {
        const res1 = await axios.post('http://localhost:3001/upload', data);
      } catch (err) {}
    }
    try {
      const res = await axios.post('http://localhost:3001/post/create', newPost);
      res.data && window.location.replace('/post/' + res.data._id);
    } catch (err) {}
  }

  return (
    <div className='create-post'>
      <span className="write-title">Create Post</span>
      <img
        src={file && URL.createObjectURL(file)}
        alt=""
        className='settings-profile-img'
      />
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label htmlFor="file-input">
            <i className="file-button fa-solid fa-plus"></i>
          </label>
          <input type="file" id="file-input" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
          <span className="write-label">Title</span>
          <input type="text" placeholder="Name your story..." className='write-input' autoFocus={true} onChange={e => setTitle(e.target.value)}/>
        </div>

        <div className="write-form-group">
          <span className="write-label">Body</span>
          <textarea placeholder='Tell your story...' type='text' className='write-input write-text' onChange={e => setDesc(e.target.value)}></textarea>
        </div>
        <button className="write-submit" type='submit'>Publish</button>
      </form>
    </div>
  )
}
