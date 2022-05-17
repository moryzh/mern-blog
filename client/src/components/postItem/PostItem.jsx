import React from 'react'
import './postItem.css'
import { Link } from 'react-router-dom'

export default function PostItem({post}) {
  return (
    <div className='post-item'>
      <Link className='link' to={'/post/' + post._id}><img src={post.background ? "http://localhost:3001/images/" + post.background : "../images/default-post-img.jpg"} alt="[post-img]" className="post-img" /></Link>
      <div className="post-title"><Link className='link' to={'/post/' + post._id}>{post.title}</Link></div>
      <div className="post-date">{new Date(post.createdAt).toDateString()}</div>
      <div className="post-cats">
        {post.categories.length > 0 ?
          post.categories.map((cat) => (
            <div key={cat} className="post-cat">{cat}</div>
          ))
        :
          'N/A'}
      </div>
      <div className="post-text">{post.desc}</div>
    </div>
  )
}
