import React from 'react'
import {getFirestore, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import {auth} from '../../firebase';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';

const db = getFirestore();

const Addcourses = () => {
    const[user] = useAuthState(auth);
    const [course, setCourse] = useState('');
    const [section, setSection] = useState('');
   

    const AddCourse = () =>{
        
    if (course !== '' && section !== ''){
        const courseRef = doc(db, "users", user?.email);
        updateDoc(courseRef, {
            classes: arrayUnion(`${section} ${course}`),
        });
        alert("Course Added!");

    }
    else {
        alert("Please fill in all fields");
    }
}

  return (
    <div className='login-wrapper'>
    <div id="content">
        <h1>Add your courses</h1>
        <form>
            <div class="input-bar">
                <label for="AddClass">Add a course</label>
                <input  onChange={(event) => setSection(event.target.value)} type="text" id="section" class="input"/>
                <box-icon name='section'></box-icon>
            </div>
            <div class="input-bar">
                <label for="addSection">Add your section</label>
                <input  onChange={(event) => setCourse(event.target.value)} type="text" id="course" class="input"/>
                <box-icon name='course'></box-icon>
            </div>
        </form>
        <button onClick={AddCourse} id="btn">Add course</button>
        <button id="btn"><Link className='link_button' to='/home'>Back to home</Link></button>
    </div>
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

export default Addcourses