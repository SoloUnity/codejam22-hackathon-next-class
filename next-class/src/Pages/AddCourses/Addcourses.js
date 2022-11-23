import React from 'react'
import {getFirestore, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import {auth} from '../../firebase';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import "./Addcourses.css";
import {classes} from './Users.js';


const db = getFirestore();

const Addcourses = () => {
    const[user] = useAuthState(auth);
    const [course, setCourse] = useState('');
    const [section, setSection] = useState('');
    
    console.log(course);
   
    const AddCourse = () =>{
        
    if (course !== '' && section !== ''){
        const courseRef = doc(db, "users", user?.email);
        updateDoc(courseRef, {
            classes: arrayUnion(`${course} ${section}`),
        });
        alert("Course Added!");

    }
    else {
        alert("Please fill in all fields");
    }
}

  return (
    <div className='add-wrapper'>
    <div id="add-content">
        <div>
            <h1>Add a Course</h1>
            <div className='inputs'>
            <div>
                <input  onChange={(event) => setCourse(event.target.value)} type="text" id="course" className="input1" placeholder='Course name'>
                </input>
                <h6>Use correct syntax. EX:</h6>
                <ul>
                    {classes.filter(classes=>classes.class_name.toUpperCase().includes(course)).slice(0,3).map((classes) => (
                        <li className='courses'>{classes.class_name}</li>
                    ))}
                </ul>
            </div>
            <div className='select-wrapper'>   
            <select value={section} onChange={(event) => setSection(event.target.value)}>
                    <option value="" disabled selected>Select your section</option>
                    <option>001</option>
                    <option>002</option>
                    <option>003</option>
                    <option>004</option>
                </select>
            </div>
            </div> 
        </div>
        <div className='Buttons'>
            <button onClick={AddCourse} id="btn1">Add course</button>
            <Link className='link_button1' to='/home'><button id="btn2">Back to home</button></Link>
        </div>
        
    </div>
    </div>
  )
}


export default Addcourses