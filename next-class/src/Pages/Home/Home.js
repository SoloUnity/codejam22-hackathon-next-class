import './Home.css';
import { NavBar} from '../../components/index';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import React from 'react';
import courses from './Courses.json';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const db = getFirestore();

const events = [
  {
    title: 'Class 1',
    start: '2021-10-01T09:00:00',
    end: '2021-10-01T10:00:00',
    daysOfWeek: [1, 2, 3, 4, 5],
  }
];

const Home = () => {
  const[user] = useAuthState(auth);

  const LoadingData = () => {
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


  for (let i = 0; i < today_classes.length; i++){
    let courseName = today_classes[i][2];
    let timeStart = today_classes[i][0]['timeslot'][today_classes[i][1]]['startTime'];
    let endTime = today_classes[i][0]['timeslot'][today_classes[i][1]]['endTime'];
    let days = []
    for (let j = 0; j < today_classes[i][0]['timeslot'].length; j++){
      days.push(today_classes[i][0]['timeslot'][j]['day']-1);
    
  }
  console.log(days);
  events.push({
    title: courseName,
    start: '2021-10-01T' + timeStart+":00",
    end: '2021-10-01T' + endTime+":00",
    daysOfWeek: days,
});
console.log(events);

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
        initialView="dayGridWeek"
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
        />
            </div>
            <div className='friends-container'>Friends</div>
          </div>
      </div>
    )

  };


export default Home