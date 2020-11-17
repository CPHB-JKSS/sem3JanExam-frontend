import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import facade from './components/apiFacade';
import Login from './components/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {roles.includes("user")?
            <li>
              <Link to="/user">User page</Link>
            </li>
            :""
          }
          
          {roles.includes("admin")? 
            <li>
              <Link to="/admin">Admin page</Link>
            </li>
          :""
          }

        </ul>

        <Route exact path="/">
          {isLoggedIn?
            <div>
              <p>logged in stuff</p>
              <button onClick={() => facade.logOut(setIsLoggedIn)}>Log out</button>
            </div>
          :
            <Login setIsLoggedIn={setIsLoggedIn} setRoles={setRoles}/>
          }
        </Route>
      </div>
    </Router>
  )
}

export default App;
