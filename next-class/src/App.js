import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, LoginScreen, SignUp } from './Pages/index';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <div className='Content'>
            <Switch>
              <Route exact path='/'>
                <LoginScreen/>
              </Route>
              <Route exact path='/home'>
                <Home/>
              </Route>
              <Route exact path='/signup'>
                <SignUp/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
