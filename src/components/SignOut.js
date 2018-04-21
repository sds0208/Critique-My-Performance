import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import '../styles/Authentication.css';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.firebase.auth().signOut().then(function() {
      alert('Sign out successful.');
    }).catch(function(error) {
      alert(error.code + error.message);
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
