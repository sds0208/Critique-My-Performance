import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import '../styles/Landing.css';

class Landing extends Component {

  render() {
    return (
      !this.props.user ?
      <div className="Landing">
        <SignUp firebase={this.props.firebase} setUser={this.props.setUser.bind(this)} user={this.props.user}/>
        <div className="gridContainer">
          <img src="/assets/ukulele.jpg" className="grid-item" alt="ukulele player"></img>
          <img src="/assets/saxophone.jpg" className="grid-item" alt="saxophone player"></img>
          <img src="/assets/cello.jpg" className="grid-item" alt="cello player"></img>
          <img src="/assets/piano1.jpg" className="grid-item" alt="piano"></img>
          <video autoPlay muted loop className="grid-item landing-vid" alt="hands playing guitar">
            <source src="assets/Playing_Acoustic_Guitar.mp4" type="video/mp4" />
          </video>
          <img src="/assets/drum.jpg" className="grid-item" alt="person playing drums"></img>
          <img src="/assets/trumpet.jpg" className="grid-item" alt="trumpet player"></img>
          <img src="/assets/drum2.jpg" className="grid-item" alt="person playing drums"></img>
          <img src="/assets/singer1.jpg" className="grid-item" alt="person singing"></img>
        </div>
        <footer>A community of musicians helping musicians</footer>
      </div> : < Redirect to="./Studio" />
    );
  }
}

export default Landing;
