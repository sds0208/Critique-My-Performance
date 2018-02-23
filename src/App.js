import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import Landing from './components/Landing';
import Studio from './components/Studio';
import User from './components/User';
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Critique My Performance</h1>
        </header>
        <Route exact path="/" component={Landing} />
        <Route exact path="/studio" component={Studio} />
        <Route exact path="/user" component={User} />
      </div>
    );
  }
}

export default App;
