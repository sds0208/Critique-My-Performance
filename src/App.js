import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Critique My Performance</h1>
        </header>
        <video autoPlay muted loop id="myVideo">
          <source src="assets/Playing_Acoustic_Guitar.mp4" type="video/mp4" />
        </video>
        <div className="sign-up">
          <p>Sign up today to get feedback from musicians around the world! Already have an account? Log in.</p>
          <form className="sign-up-form">
            Email:
            <input type="text" /><br></br>
            Username:
            <input type="text" /><br></br>
            Password:
            <input type="text" /><br></br>
            Confirm Password:
            <input type="text" />
            <button>Submit</button>
          </form>
        </div>
        <p className="App-intro">
          A community of musicians helping musicians.
        </p>
      </div>
    );
  }
}

export default App;
