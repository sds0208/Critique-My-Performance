import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <video autoPlay muted loop id="myVideo">
          <source src="assets/Playing_Acoustic_Guitar.mp4" type="video/mp4" />
        </video>
        <div className="sign-up">
          <p>Sign up today to get feedback from musicians around the world! Already have an account? <Link to='/user'>Log in.</Link></p>
          <form className="sign-up-form">
            Email:
            <input type="text" /><br></br>
            Username:
            <input type="text" /><br></br>
            Password:
            <input type="text" /><br></br>
            Confirm Password:
            <input type="text" />
            <button><Link to='/user'>Submit</Link></button>
          </form>
        </div>
        <p className="App-intro">
          A community of musicians helping musicians.
        </p>
      </div>
    );
  }
}

export default Landing;
