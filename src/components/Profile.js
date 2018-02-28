import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return(
      <div className="profile">
      {this.props.user ?
        <div>
          <p>{this.props.user.displayName}</p>
          <p>{this.props.user.email}</p>
        </div> :
        null
      }

      </div>
    );
  }
}

export default Profile;
