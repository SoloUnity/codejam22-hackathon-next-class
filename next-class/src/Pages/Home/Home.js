import './Home.css';
import { NavBar} from '../../components/index';
import { doc, getDoc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import courses from './Courses.json';
import FullCalendar from '@fullcalendar/react';
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
        var myFriends = docSnap.data();
        document.getElementById("friends").innerHTML = myFriends.friends;
        console.log("My friends: " + myFriends.friends);
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
    endStr: '2023-10-01T' + timeStart+":00-"+ endTime,
    startStr: '2022-10-01T' + timeStart+":00-"+ endTime,
    startTime: timeStart+":00",
    endTime: endTime+":00",
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
            <div className="schedule-container" >
              <button className="blue" onClick={LoadingData}>Load my Calendar</button>
              <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        weekends={false}
        dayHeaderFormat={{ weekday: 'short', omitCommas: true }}
        events={events}
        displayEventTime={false}
        scrollTime="08:00:00"
        eventColor="#667a89"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
        />
    
            </div>
            <div className='friends-container' id='friend'>
            <div class="input-bar" id='input-bar-small'>
                <input  onChange={(event) => setFriend(event.target.value)} type="text" id="Email" class="input" placeholder='Email Adress'/>
                <box-icon name='user'></box-icon>
            </div>
            <button onClick={addFriend} className="blue">Add friends</button>
            <div className='friendslist'>
              <h1 className='friendslist'>Friends</h1>
              <div id='friends'></div>
            </div>
            </div>

          </div>
      </div>
    )

  };


export default Home