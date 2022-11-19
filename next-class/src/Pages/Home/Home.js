import './Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import { NavBar } from "../../components/index";


const Home = () => {
  const[user, loading, error] = useAuthState(auth );
  return (
    <div className="home-wrapper">
        <NavBar />
        <h1>Welcome{user?.email}</h1>
        <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
    )
  };


export default Home