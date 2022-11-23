import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Addcourses, Home, Login, SignUp , Hero} from './Pages/index';
import ProtectedRoute from './components/ProtectedRoute';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <div className="App">
          <div className='Content'>
            <Switch>
              <Route exact path='/login'>
                <Login/>
              </Route>
              <Route exact path='/'>
                <Hero/>
              </Route>
              <Route exact path='/home'>
              <ProtectedRoute>               
               <Home/>
              </ProtectedRoute>
              </Route>
              <Route exact path='/signup'>
                <SignUp/>
              </Route>
              <Route exact path='/addcourse'>
                <Addcourses/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </UserAuthContextProvider>

  );
}

export default App;
