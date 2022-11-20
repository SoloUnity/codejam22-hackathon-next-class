import './Home.css';
import { NavBar} from '../../components/index';
import { doc, getDoc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
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
    id: 1,
    title: 'event 1',
    start: '2:00:00',
    end: '14:00:00',
    daysOfWeek: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: 'event 2',
    start: '2021-06-16T13:00:00',
    end: '2021-06-16T18:00:00',
  },
  {
    id: 3,
    title: 'event 2',
    start: '2021-06-16T13:00:00',
    end: '2021-06-16T18:00:00',
  },
  {
    id: 4,
    title: 'event 2',
    start: '2021-06-16T13:00:00',
    end: '2021-06-16T18:00:00',
  },
  {
    id: 5,
    title: 'event 2',
    start: '2021-06-16T13:00:00',
    end: '2021-06-16T18:00:00',
  },
];

const Home = () => {
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
        var userClass = docSnap.data().classes;
        for (let i = 0; i < userClass.length; i++) {
          userClass[i] = userClass[i].split(" ");
        }
        console.log(userClass);

      const today = 2 //new Date().getDay() + 1;
      let today_classes = [];
       console.log(today);
       console.log(today_classes);

      for (let i = 0; i < userClass.length; i++) {
          for (let k = 0; i < userClass.length; i++) {
            let subjectName = userClass[i][k];
            let courseSection = userClass[i][k+1];
            console.log(subjectName);
            console.log(courseSection);
          
          for (let i = 0; i < courses[subjectName][courseSection]['timeslot'].length; i++) {
                   console.log(courses[subjectName][courseSection]['timeslot'][i]['day'], today);
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
    let teacher = today_classes[i][0]['teacher'];
    let startTime = today_classes[i][0]['timeslot'][today_classes[1]]['startTime'];
    let endTime = today_classes[i][0]['timeslot'][today_classes[1]]['endTime'];
    
    
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
            </div>
          </div>
      </div>
    )

  };


export default Home