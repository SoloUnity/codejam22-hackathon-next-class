import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='Content'>
          <Switch>
            <Route extact path='/'>
              <LoginScreen/>
            </Route>
            <Route path='/home'>
              <Home/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
