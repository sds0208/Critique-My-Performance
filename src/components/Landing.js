import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import Studio from './Studio';

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      !this.props.firebase.auth().currentUser ?
      <div className="Landing">
        <SignUp firebase={this.props.firebase} setUser={this.props.setUser.bind(this)} user={this.props.user}/>

          <div className="gridContainer">
            <img src="/assets/ukulele.jpg" className="grid-item"></img>
            <img src="/assets/saxophone.jpg" className="grid-item"></img>
            <img src="/assets/cello.jpg" className="grid-item"></img>

            <img src="/assets/piano1.jpg" className="grid-item"></img>
            <video autoPlay muted loop className="grid-item">
              <source src="assets/Playing_Acoustic_Guitar.mp4" type="video/mp4" />
            </video>
            <img src="/assets/drum.jpg" className="grid-item"></img>
            <img src="/assets/trumpet.jpg" className="grid-item"></img>
            <img src="/assets/drum2.jpg" className="grid-item"></img>
            <img src="/assets/singer1.jpg" className="grid-item"></img>
          </div>


          <footer>A community of musicians helping musicians</footer>

      </div> : <Redirect to="./studio" />
    );
  }
}

export default Landing;
