import './SignUp.css';
import { useState } from 'react';
import React from 'react'
import {Link} from 'react-router-dom';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import {useUserAuth} from '../../context/UserAuthContext';
import {Alert} from 'react-bootstrap';

const db = getFirestore();

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {SignUp} = useUserAuth();
    const [error, setError] = useState('');

    const register = async (e) =>{
        e.preventDefault();
        try {
            await SignUp(email, password);
            window.location.replace('/login');
        }   catch (error) {
            setError(error.message);   
        }
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
        {error && <Alert variant='danger'>{error}</Alert>}
        <form>
        <div class="input-bar">
                <input  onChange={(event) => setUsername(event.target.value)} type="text" id="Email" class="input" placeholder='Username'/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <input  onChange={(event) => setEmail(event.target.value)} type="text" id="Email" class="input" placeholder='Email'/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <input onChange={(event) => setPassword(event.target.value)} type="password" id="password" class="input" placeholder='Password'/>
                <box-icon name='lock-alt' ></box-icon>
            </div>
        </form>
        <button onClick={register} id="btn6">Register</button>
        <h5>Already have an account?</h5>
        <Link className='link_button' to='/login'><button id="btn6">Login</button></Link>
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