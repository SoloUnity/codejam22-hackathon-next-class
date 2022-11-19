import React from 'react'
import { Link } from 'react-router-dom'

const Setusername = () => {
  return (
    
    <div className='login-wrapper'>
    <div id="content">
        <h1>Set up your username</h1>
        <form>
            <div class="input-bar">
                <label for="Username">Username</label>
                <input  type="text" id="username" class="input"/>
                <box-icon name='username'></box-icon>
            </div>
        </form>
        <button  id="btn"><Link className='link_button' to='/home'>Next</Link></button>

    </div>
    </div>
  )
}

export default Setusername