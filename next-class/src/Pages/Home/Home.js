import './Home.css';
import { NavBar, Calendar} from '../../components/index';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import React from 'react';
import {createRoot} from 'react-dom/client' 

const db = getFirestore();

let classes = [['MATH-111', '001'], ['COMP-202', '001'], ['ECSE-202', '001']]

console.log(courses);

const Home = () => {
  const[user] = useAuthState(auth);

  function LoadingData (){
    getDoc(doc(db, "users", user.email)).then(docSnap => {
      if (docSnap.exists()) {
        const userClass = docSnap.data().classes;
        console.log(userClass)
      } else {
        console.log("No such document!");
      }
    })
  }

  const today = 3//new Date().getDay() + 1;
  let today_classes = [];
  classes.forEach(element => {
    let subjectName = element[0];
    let courseSection = element[1];

    for (let i = 0; i < courses[subjectName][courseSection]['timeslot'].length; i++) {
      console.log(courses[subjectName][courseSection]['timeslot'][i]['day'], today);
      if (courses[subjectName][courseSection]['timeslot'][i]['day'] == today){
        today_classes.push([courses[subjectName][courseSection], i, subjectName]);
        break
    }
  }});
 
 
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
  
  today_classes.forEach(cla => {
    let widgetTitle = React.createElement('div', 'widget-title', `${cla[2]}`)
    let widgetTeacher =  React.createElement('div', 'widget-title', `${cla[0]['teacher']}`)
    let widgetTime =  React.createElement('div', 'widget-title', `${cla[0]['timeslot'][cla[1]]['startTime']} - ${cla[0]['timeslot'][cla[1]]['endTime']}`)
    const root = createRoot(document.getElementById('SCHEDULE'))
    root.render(widgetTitle)
  })


  // let scheduleContainer = document.querySelector('schedule-container');
  // today_classes.forEach(cla => {
  //   let classWidget = document.createElement('div');
  //   classWidget.setAttribute('class', 'class-widget');
  //   classWidget.innerHTML = `<div class='widget-title'>${cla[2]}</div>`;
  //   classWidget.innerHTML += `<div class='widget-teacher'>${cla[0]['teacher']}</div>`;
  //   classWidget.innerHTML += `<div class='widget-times'>${cla[0]['timeslot'][cla[1]]['startTime']} - ${cla[0]['timeslot'][cla[1]]['endTime']}</div>`;
  // })


  return (
    <div className="home-wrapper">
      <NavBar />

          <div className='block-container'>
            <div className="schedule-container">
              <button className="button-css" onClick={LoadingData}>Load my Calendar</button>
              <Calendar/>
            </div>
            <div className='friends-container'>Friends</div>
          </div>
      </div>
    )
  };


export default Home