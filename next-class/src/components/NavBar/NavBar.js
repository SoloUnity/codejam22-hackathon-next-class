import "./NavBar.css";
import { Link } from 'react-router-dom';
import React from 'react' 
import {auth} from '../../firebase';
import Logo from '../../assets/Logo.svg';

const NavBar = () => {
  return (
    <div><div class="navbar">
    <div><img src={Logo} alt='reload page' className='logo'></img></div>
      <div class="links">
      <button className='blue'><Link className='link' to='/addcourse'>Add course</Link></button>
        <button className = 'button-css' onClick={() => auth.signOut()}><Link className='link_button' to='/'>Sign Out</Link></button>
      </div>
    </div></div>
  )
}

export default NavBar