import React, { useContext } from 'react'
import './navbar.css'
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';

export default function Navbar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  }

  return (
    <div className='navbar'>
      <div className="navbar-l">
        dev_logs
      </div>
      <div className="navbar-m">
        <div className="navbar-list"><Link className="link" to="/">_home</Link></div>
        <div className="navbar-list"><Link className="link" to="/">_about</Link></div>
        <div className="navbar-list"><Link className="link" to="/write">_write</Link></div>
        <div className="navbar-list"><Link className="link" to="/">_contact</Link></div>
      </div>
      <div className="navbar-r">
        { user ?
          <>
            <Link className='link' to='/settings'>
              <img src={user.avatar ? 'http://localhost:3001/images/' + user.avatar : '../images/default-avatar.jpg'} alt="[profile img]" className="navbar-profile-img" />
            </Link>
            <div className="navbar-list" style={{cursor: "pointer"}} onClick={handleLogout}>_logout</div>
          </>
          :
          <>
            <div className="navbar-list"><Link className="link" to="/login">_login</Link></div>
            <div className="navbar-list"><Link className="link" to="/register">_register</Link></div>
          </>
        }
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}
