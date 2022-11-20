import './Home.css';
import { NavBar} from '../../components/index';
import { doc, getDoc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import courses from './Courses.json';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Link } from 'react-router-dom';

const db = getFirestore();



const Home = () => {
  
  const [events, setEvents] =  useState([
    {
      
    }
  ]);
  
  const[user] = useAuthState(auth);
  const[friend, setFriend] = React.useState('');

  const addFriend = () => {
  
    if (friend !== ''){
      const friendRef = doc(db, "users", user.email);
      updateDoc(friendRef, {
          friends: arrayUnion(friend),
      });
      alert("Friend Added!");
    }
      else {
        alert("Please fill in all fields");
    }
}

  const LoadingData = () => {
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        var myFriends = docSnap.data().friends;
        console.log("My friends: " + myFriends);
      }
    });
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        var userClass = docSnap.data().classes;
        for (let i = 0; i < userClass.length; i++) {
          userClass[i] = userClass[i].split(" ");
        }

      const today = 2 //new Date().getDay() + 1;
      let today_classes = [];

      for (let i = 0; i < userClass.length; i++) {
          for (let k = 0; i < userClass.length; i++) {
            let subjectName = userClass[i][k];
            let courseSection = userClass[i][k+1];

          
          for (let i = 0; i < courses[subjectName][courseSection]['timeslot'].length; i++) {
                   if (courses[subjectName][courseSection]['timeslot'][i]['day'] == today){
                     today_classes.push([courses[subjectName][courseSection], i, subjectName]);
                     break
                   }
        }

      today_classes.sort((a, b) => {
      let timeA = a[0]['timeslot'][a[1]]['startTime'];
      let timeB = b[0]['timeslot'][a[1]]['startTime']
      if (timeA > timeB){
        return -1;
      }else if(timeA < timeB){
        return 1;
      }else{
        return 0;
      }
    });
  console.log(today_classes);

setEvents()
const temp_ls = [];
  for (let i = 0; i < today_classes.length; i++){
    let courseName = today_classes[i][2];
    let timeStart = today_classes[i][0]['timeslot'][today_classes[i][1]]['startTime'];
    let endTime = today_classes[i][0]['timeslot'][today_classes[i][1]]['endTime'];
    let days = []
    for (let j = 0; j < today_classes[i][0]['timeslot'].length; j++){
      days.push(today_classes[i][0]['timeslot'][j]['day']-1);
    
  }
  console.log(days);
  temp_ls.push({
    title: courseName,
    start: '2021-10-01T' + timeStart+":00",
    end: '2021-10-01T' + endTime+":00",
    daysOfWeek: days,
});
setEvents(temp_ls)
console.log(temp_ls);

}
      }
    }
      } else {
        console.log("No such document!");
      }
    })
  }
  
  return (
    <div className="home-wrapper">
      <NavBar />

          <div className='block-container'>
            <div className="schedule-container">
              <button className="button-css" onClick={LoadingData}>Load my Calendar</button>
              <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventColor="#3ba2c8"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
        />
            </div>
            <div className='friends-container'>
            <div class="input-bar">
                <label for="Email">Email Adress</label>
                <input  onChange={(event) => setFriend(event.target.value)} type="text" id="Email" class="input"/>
                <box-icon name='user'></box-icon>
            </div>
            <button onClick={addFriend} className="button-css">Add friends</button>
            <button><Link className='link_button' to='/addcourse'>Add courses</Link></button>
            </div>
          </div>
      </div>
    )

  };


export default Home