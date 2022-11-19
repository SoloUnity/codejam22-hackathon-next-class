import "./NavBar.css";
import { Link } from 'react-router-dom';
import React from 'react'
import {auth} from '../../firebase';


const NavBar = () => {
  return (
    <div><div class="navbar">
    <div class="logo">Logo</div>
      <div class="links">
        <button className = 'button-css' onClick={() => auth.signOut()}><Link className='link_button' to='/'>Sign Out</Link></button>
      </div>
    </div></div>
  )
}

export default NavBar