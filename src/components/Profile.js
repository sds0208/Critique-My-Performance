import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.handleUsername = this.handleUsername.bind(this);
    this.addUsername = this.addUsername.bind(this);
  }

  handleUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value});
  }

  addUsername(username) {
    this.props.firebase.auth().currentUser.updateProfile({displayName: username});
  }

  render() {
    return(
      <div className="profile">
      {this.props.user ?
        <div>
          {this.props.user.displayName ?
            <div>Username: {this.props.user.displayName}</div> :
            <div>
              <div>Username: No username yet.</div>
              <form onSubmit={() => this.addUsername(this.state.username)}>
                <input type="text" onChange={this.handleUsername}></input>
                <button type="submit">Add</button>
              </form>
            </div>}
          <p>Email: {this.props.user.email}</p>
        </div> :
        null
      }

      </div>
    );
  }
}

export default Profile;
