import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import PostMenu from '../../components/postMenu/PostMenu'
import './home.css'
import axios from "axios"
import { useLocation } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3001/post/" + search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header title="home"/>
      <div className='home'>
        <Sidebar />
        <PostMenu posts={posts}/>
      </div>
    </>
  )
}
