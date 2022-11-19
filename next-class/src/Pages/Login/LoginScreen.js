import './LoginScreen.css';
import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {createUser} = UserAuth();

    const handleSubmit = async (e)  => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

  return (
    <div id="content">
        <h1>Welcome to Next-Class!</h1>
        <form onSubmit={handleSubmit} action="" method="get">
            <div class="input-bar">
                <label for="Email">Email Adress</label>
                <input  onChange={(e) => setEmail(e.target.value)} type="text" id="Email" class="input"/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <label for="password">password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" class="input"/>
                <box-icon name='lock-alt' ></box-icon>
            </div>
        </form>
        <button type="submit" id="btn"><Link className='link_button' to='/home'>Login</Link></button>
        <h5>Don't have an account?</h5>
        <button type="submit" id="btn"><Link className='link_button' to='/signup'>Sign Up</Link></button>
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

export default LoginScreen