import './Home.css';
import { NavBar } from '../../components/index';

const Home = () => {

  return (
    <div className="home-wrapper">
      <NavBar />

          <div className='block-container'>
            <div className="schedule-container">
          
            </div>
            <div className='friends-container'>Friends</div>
          </div>
      </div>
    )
  };


export default Home