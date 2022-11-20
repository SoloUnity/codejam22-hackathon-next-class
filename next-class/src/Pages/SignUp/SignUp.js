import './SignUp.css';
import { useState } from 'react';
import React from 'react'
import {auth} from '../../firebase';
import {Link} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore';

const db = getFirestore();

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const register = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(auth=>console.log(auth))
        .catch(error=>console.error(error))

        setDoc(doc(db, "users", email), {
            email: email,
            username: username,
            friends: [],
            classes: [],
        });
    }
    
return (
    <div className='signup-wrapper'>
    <div id="content">
        <h1 class='welcome-text'>Register to Next-Class</h1>
        <form>
        <div class="input-bar">
                <input  onChange={(event) => setUsername(event.target.value)} type="text" id="Email" class="input" placeholder='Username'/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <input  onChange={(event) => setEmail(event.target.value)} type="text" id="Email" class="input" placeholder='Email Adress'/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <input onChange={(event) => setPassword(event.target.value)} type="password" id="password" class="input" placeholder='Password'/>
                <box-icon name='lock-alt' ></box-icon>
            </div>
        </form>
        <button onClick={register} id="btn"><Link className='link_button' to='/home'>Register</Link></button>
        <h5>Already have an account?</h5>
        <button id="btn"><Link className='link_button' to='/'>Login</Link></button>
    </div>
    </div>
  )
};

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

export default Login;