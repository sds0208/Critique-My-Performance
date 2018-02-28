import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Studio from './Studio';

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Landing">
        {!this.props.firebase.auth().currentUser ?
          <SignUp firebase={this.props.firebase} setUser={this.props.setUser.bind(this)} user={this.props.user}/>
          : null }
      </div>
    );
  }
}

export default Landing;
