import './LoginScreen.css';


import React from 'react'
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <div id="content">
        <h1>Welcome to Next-Class!</h1>
        <form action="" method="get">
            <div class="input-bar">
                <label for="name">username</label>
                <input type="text" id="name" class="input"/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <label for="password">password</label>
                <input type="password" id="password" class="input"/>
                <box-icon name='lock-alt' ></box-icon>
            </div>
        </form>
        <button type="submit" id="btn"><Link className='link_button' to='/home'>Login</Link></button>
    </div>
  )
}

const input = document.querySelectorAll('.input');

function inputFocus() {
    this.parentNode.classList.add('focus');
}

function inputBlur() {
    if(this.value === '' || this.value === null){
        this.parentNode.classList.remove('focus');
    }
}

input.forEach((e) => {
    e.addEventListener('focus', inputFocus);
    e.addEventListener('blur', inputBlur);
})

export default LoginScreen