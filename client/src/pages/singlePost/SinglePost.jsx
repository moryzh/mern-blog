import React from 'react'
import Header from '../../components/header/Header'
import PostView from '../../components/postView/PostView'
import Sidebar from '../../components/sidebar/Sidebar'
import './singlePost.css'

export default function SinglePost() {
  return (
    <>
      <Header title="single-post"/>
      <div className='single-post'>
        <Sidebar/>
        <PostView/>
      </div>
    </>
  )
}
