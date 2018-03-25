import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import Landing from './components/Landing';
import Studio from './components/Studio';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAg7b0VVXDm-Tv0a46ZZwqkjYDZx6gHIpk",
  authDomain: "critique-my-performance.firebaseapp.com",
  databaseURL: "https://critique-my-performance.firebaseio.com",
  projectId: "critique-my-performance",
  storageBucket: "critique-my-performance.appspot.com",
  messagingSenderId: "884975084194"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
  }

  setUser(user) {
    this.setState({ user: user });
    if (user !== null) {console.log(user.displayName)};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Critique My Performance</h1>
          {!firebase.auth().currentUser ?
            <Login firebase={firebase} user={this.state.user}/> :
              <div className="links">
                <Link className="link" to={'/profile'}>My Profile</Link>
                <Link className="link" to={'/studio'}>The Studio</Link>
              </div>
          }
        </header>
        <Landing firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
        <Route exact path="/studio" render={(props) => ( <Studio firebase={firebase} user={this.state.user}/> )} />
        <Route exact path="/profile" render={(props) => ( <Profile firebase={firebase} user={this.state.user}/> )} />
      </div>
    );
  }
}

export default App;
