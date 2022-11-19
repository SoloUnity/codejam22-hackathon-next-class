import React from 'react'
import "./SignUp.css";
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div id="content">
        <h1>Welcome to Next-Class!</h1>
        <form action="" method="get">
            <div class="input-bar">
                <label for="email">Email Adress</label>
                <input type="email" id="email" class="input"/>
                <box-icon name='user-name' ></box-icon>
            </div>
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
        <button type="submit" id="btn1"><Link className='link_button' to='/'>Sign Up</Link></button>
        <h5>Already have an account?</h5>
        <button type="submit" id="btn2"><Link className='link_button' to='/'>Login</Link></button>
    </div>
  )
}

const input = document.querySelectorAll('.input');

function inputFocus() {
    this.parentNode.classList.add('focus');
}

function inputBlur() {
    if(this.value == '' || this.value === null){
        this.parentNode.classList.remove('focus');
    }
}

input.forEach((e) => {
        e.addEventListener('focus', inputFocus);
        e.addEventListener('blur', inputBlur);
})

export default SignUp