import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.firebase.auth().signOut().then(function() {
      alert('Sign out successful.');

    }).catch(function(error) {
      // An error occurred
    });
  }

  render() {
    return (
      <div className="SignUp">
        <div className="name-sign-out">
          <p>Signed in as {this.props.user.displayName ? this.props.user.displayName : this.props.user.email}</p>
          <button className="button" onClick={this.signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
}

export default SignOut;
