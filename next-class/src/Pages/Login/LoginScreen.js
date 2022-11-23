import './LoginScreen.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useUserAuth} from '../../context/UserAuthContext';
import {Alert} from 'react-bootstrap';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {LogedIn} = useUserAuth();
    const [error, setError] = useState('');

    const LoggingIn = async (e) =>{
        e.preventDefault();
        try {
            await LogedIn(email, password);
            window.location.replace('/home');
        }   catch (error) {
            setError(error.message);   
        }
    }

return (
    <div className='login-wrapper'>
    <div id="content">
        <h1 className='welcome-text'>Welcome to Next-Class!</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        <form>
            <div class="input-bar">
                <input  onChange={(event) => setEmail(event.target.value)} type="text" id="Email" class="input" placeholder='Email'/>
                <box-icon name='user'></box-icon>
            </div>
            <div class="input-bar">
                <input onChange={(event) => setPassword(event.target.value)} type="password" id="password" class="input" placeholder='Password'/>
                <box-icon name='lock-alt' ></box-icon>
            </div>
        </form>
        <button onClick={LoggingIn} id="btn">Login</button>
        <h5>Don't have an account? <Link className='link_button1' to='/signup'><h4>Sign up</h4></Link>
</h5>
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