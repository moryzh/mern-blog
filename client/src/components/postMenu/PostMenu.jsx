import React from 'react'
import PostItem from '../postItem/PostItem'
import './postMenu.css'

export default function PostMenu({posts}) {
  return (
    <div className='post-menu'>
      {posts.map((post) => (
        <PostItem key={post._id} post={post}/>
      ))}
    </div>
  )
}
