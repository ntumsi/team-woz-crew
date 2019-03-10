import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login/';
import NewUser from './pages/NewUser/';
import Home from './pages/HomePage/Home';
import ShareForm from "./pages/ShareForm/";
import SharePage from "./pages/SharePage/";
import User from "./pages/User";
import NavigationBar from "./components/NavigationBar";

const App = () => (
  <Router>
    <div>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/new-user" component={NewUser} /> 
        <Route exact path="/home" component={Home} />
        <Route exact path="/share" component={ShareForm} />
        <Route exact path="/share-page" component={SharePage} />
        <Route exact path="/profile" component={User} />
      </Switch>
    </div>
  </Router>
);

export default App;