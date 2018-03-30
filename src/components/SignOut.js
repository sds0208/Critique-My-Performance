import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

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
      <div className="SignOut">
        <div className="name-sign-out">
          < Gravatar email={this.props.user.email} size={30} className="gravatar-sign-out"/>
          <div>Signed in as {this.props.user.displayName ? "  " + this.props.user.displayName : "  " + this.props.user.email}</div>
          <button className="button" onClick={this.signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
}

export default SignOut;
