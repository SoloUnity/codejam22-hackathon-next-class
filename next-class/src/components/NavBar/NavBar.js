import "./NavBar.css";
import { Link } from 'react-router-dom';
import React from 'react'
import {auth} from '../../firebase';
import {NC} from '../../assets/svg';

const NavBar = () => {
  return (
    <div><div class="navbar">
    <div><img src={NC} alt='reload page' className='logo'></img></div>
      <div class="links">
        <button className = 'button-css' onClick={() => auth.signOut()}><Link className='link_button' to='/'>Sign Out</Link></button>
      </div>
    </div></div>
  )
}

export default NavBar