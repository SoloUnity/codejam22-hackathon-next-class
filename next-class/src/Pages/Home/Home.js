import './Home.css';
import { NavBar, Calendar} from '../../components/index';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

const db = getFirestore();

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