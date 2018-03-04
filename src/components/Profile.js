import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', usernameEdit: false, emailEdit: false };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.editEmail = this.editEmail.bind(this);
    this.showUsernameEdit = this.showUsernameEdit.bind(this);
    this.showEmailEdit = this.showEmailEdit.bind(this);
  }

  handleUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value});
  }

  handleEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  editEmail(email) {
    console.log(email);
    this.props.firebase.auth().currentUser.updateEmail(email);
  }

  addUsername(username) {
    this.props.firebase.auth().currentUser.updateProfile({displayName: username});
  }

  showUsernameEdit() {
    this.setState({ usernameEdit: true });
  }

  showEmailEdit() {
    this.setState({ emailEdit: true });
  }

  render() {
    return(
      <div className="profile">
      {this.props.user ?
        <div>
          {this.props.user.displayName ?
            <div>
              <div>Username: {this.props.user.displayName}</div>
              <button onClick={() => this.showUsernameEdit()}>Edit</button>
              {this.state.usernameEdit ?
                <form onSubmit={() => this.addUsername(this.state.username)}>
                  <input type="text" onChange={this.handleUsername}></input>
                  <button type="submit">Add</button>
                </form> : null
              }
            </div> :
            <div>
              <div>Username: No username yet.</div>
              <form onSubmit={() => this.addUsername(this.state.username)}>
                <input type="text" onChange={this.handleUsername}></input>
                <button type="submit">Add</button>
              </form>
            </div>}
          <div>Email: {this.props.user.email}</div>
          <button onClick={() => this.showEmailEdit()}>Edit</button>
          {this.state.emailEdit ?
            <form onSubmit={() => this.editEmail(this.state.email)}>
              <input type="text" onChange={this.handleEmail}></input>
              <button type="submit">Add</button>
            </form> :
            null }
        </div> :
        <p>Please sign in.</p>
      }
      <div>Performances will go here</div>
      </div>
    );
  }
}

export default Profile;
