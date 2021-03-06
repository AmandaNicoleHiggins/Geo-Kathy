import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Nav from "./components/Nav"
import Home from "./components/Home";
import About from "./components/About";

// import Login from "./components/Sign-In";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Nightlife from "./components/Nightlife"
import Hotels from "./components/Hotels";

import "./App.css"
// Redux stuff
import { Provider } from "react-redux";
import store from "./store";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Nav component={Nav} />
              <Route exact path="/" component={About} />
              {/* <Route exact path="/posts" component={Home} /> */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/restaurants" component={Home} />
              <PrivateRoute exact path="/nightlife" component={Nightlife} />
              <PrivateRoute exact path="/hotels" component={Hotels} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }

  }

export default App;
