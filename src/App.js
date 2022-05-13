import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import UpdatePage from './UpdatePage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [user, setUser] = useState(null);

  // add a useEffect to get the user and inject the user object into state on load

  useEffect(() => {
    const user = getUser(); // this gets an object of the person's token?
    // console.log(user); // lets see what it returns

    if (user) {
      setUser(user); //inject into state
    }
  }, []);

  async function handleLogout() {
    // call the logout function
    // clear the user in state
    await logout();
    setUser(null);
  }

  return (
    <Router>
      <div className="App">
        <header>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/create"> Create </NavLink>
          <NavLink to="/board-games"> List </NavLink>
          <button onClick={handleLogout}>Log Out</button>
        </header>
        <main>
          <Switch>
            {/* react-router-dom tool that allows us to switch to different routes */}
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {user ? <Redirect to="/board-games" /> : <AuthPage setUser={setUser} />}
            </Route>

            <Route exact path="/board-games">
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {user ? <ListPage /> : <Redirect to="/" />}
            </Route>

            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {user ? <UpdatePage /> : <Redirect to="/" />}
            </Route>

            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {user ? <CreatePage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
