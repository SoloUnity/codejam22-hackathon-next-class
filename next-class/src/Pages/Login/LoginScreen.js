import './LoginScreen.css';
import { useState } from 'react';
import React from 'react'
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () =>{
        signInWithEmailAndPassword (auth, email, password)
        .then(auth=>console.log(auth))
        .catch(error=>console.error(error))
    }

    const register = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(auth=>console.log(auth))
        .catch(error=>console.error(error))
    }

return (
    <div id="content">
        <h1>Welcome to Next-Class!</h1>
        <form>
            <div class="input-bar">
                <label for="Email">Email Adress</label>
                <input  onChange={(event) => setEmail(event.target.value)} type="text" id="Email" class="input"/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <label for="password">password</label>
                <input onChange={(event) => setPassword(event.target.value)} type="password" id="password" class="input"/>
                <box-icon name='lock-alt' ></box-icon>
            </div>
        </form>
        <button onClick={signIn} id="btn"><Link className='link_button' to='/'>Login</Link></button>
        <h5>Don't have an account?</h5>
        <button onClick={register} id="btn"><Link className='link_button' to='/signup'>Sign Up</Link></button>
    </div>
  )
};

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

export default Login;