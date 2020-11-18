import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import facade from './components/apiFacade';
import Login from './components/login';
import UserPage from './components/userPage';

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
          {roles.includes("user") || roles.includes("admin")?
            <li>
              <Link to="/ext">External API demo</Link>
            </li>
            :""
          }

        </ul>

        <Route exact path="/">
          {isLoggedIn?
            <div>
              <UserPage roles={roles}/>
              <button onClick={() => facade.logOut(setIsLoggedIn, setRoles)}>Log out</button>
            </div>
          :
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setRoles={setRoles}/>
          }
        </Route>
        <Route path="/user">
          {roles.includes("user")?
            <p>User stuff here</p>
          :
            <p>You are not allowed to view this page</p>
          }
        </Route>
        <Route path="/admin">
          {roles.includes("admin")?
            <p>Admin stuff here</p>
          :
            <p>You are not allowed to view this page</p>
          }
        </Route>
        <Route path="/ext">
          {roles.includes("user") || roles.includes("admin")?
            <p>External API stuff here</p>
          :
            <p>You are not allowed to view this page</p>
          }
        </Route>
      </div>
    </Router>
  )
}

export default App;
