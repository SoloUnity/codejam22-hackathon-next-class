import './Home.css';
import { NavBar, Calendar} from '../../components/index';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import React from 'react';
import {createRoot} from 'react-dom/client' 
import courses from './Courses.json';

const db = getFirestore();

const Home = () => {
  const[user] = useAuthState(auth);

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
              <Calendar/>
            </div>
            <div className='friends-container'>Friends</div>
          </div>
      </div>
    )

  };


export default Home