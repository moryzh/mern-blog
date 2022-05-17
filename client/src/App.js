import React, { useContext } from 'react'
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import CreatePost from './pages/createPost/CreatePost';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import SinglePost from './pages/singlePost/SinglePost';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={user ? <Home/> : <Register/>}/>
          <Route path='/register' element={user ? <Register/> : <Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/write' element={user ? <CreatePost/> : <Register/>}/>
          <Route path='/settings' element={user ? <Settings/> : <Register/>}/>
          <Route path='/post/:postId' element={user ? <SinglePost/> : <Register/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
