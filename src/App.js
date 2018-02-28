import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
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

  signOut() {
    firebase.auth().signOut().then(function() {
      alert('Sign out successful.');
    }).catch(function(error) {
      // An error occurred
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Critique My Performance</h1>
          {!firebase.auth().currentUser ?
            <Login firebase={firebase} /> :
            <div className="sign-in">
              <p>Signed in as {this.state.user.email}</p>
              <button onClick={this.signOut}>Sign Out</button>
              <Link to={'/profile'}>My Profile</Link>
              <Link to={'/studio'}>The Studio</Link>
            </div>
          }
        </header>
        <Landing firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
        <Route exact path="/studio" component={Studio} />
        <Route exact path="/profile" render={(props) => ( <Profile firebase={firebase} user={this.state.user}/> )} />
      </div>
    );
  }
}

export default App;
