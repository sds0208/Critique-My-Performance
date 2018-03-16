import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', usernameEdit: false, emailEdit: false, iframes: [], currentUserIframes: [] };
    this.iframesRef = this.props.firebase.database().ref('iframes');
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.editEmail = this.editEmail.bind(this);
    this.showUsernameEdit = this.showUsernameEdit.bind(this);
    this.showEmailEdit = this.showEmailEdit.bind(this);
  }

  componentDidMount() {
    this.iframesRef.on('child_added', snapshot => {
      const iframe = snapshot.val();
      iframe.key = snapshot.key;
      this.setState({ iframes: this.state.iframes.concat( iframe ), currentUserIframes: this.state.iframes.filter(iframe => iframe.userUID === this.props.user.uid) });
    });
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
      <div className="Profile">
      {this.props.user ?
        <div className="edit-profile">
          <h2>Profile</h2>
          {this.props.user.displayName ?
            <div>
              <div className="profile-info">Username: {this.props.user.displayName}</div>
              <button onClick={() => this.showUsernameEdit()}>Edit</button>
              {this.state.usernameEdit ?
                <form className="profile-form" onSubmit={() => this.addUsername(this.state.username)}>
                  <input type="text" onChange={this.handleUsername}></input>
                  <button type="submit">Add</button>
                </form> : null
              }
            </div> :
            <div>
              <div>Username: No username yet.</div>
              <form className="profile-form" onSubmit={() => this.addUsername(this.state.username)}>
                <input type="text" onChange={this.handleUsername}></input>
                <button type="submit">Add</button>
              </form>
            </div>}
          <div className="profile-info">Email: {this.props.user.email}</div>
          <button onClick={() => this.showEmailEdit()}>Edit</button>
          {this.state.emailEdit ?
            <form className="profile-form" onSubmit={() => this.editEmail(this.state.email)}>
              <input type="text" onChange={this.handleEmail}></input>
              <button type="submit">Add</button>
            </form> :
            null }
        </div> :
        <p>Please sign in.</p>
      }
      <h2>My Performances</h2>
      {this.state.currentUserIframes.map(iframe =>
        <div key={iframe.key} className="video">
            <h3>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</h3>
            {ReactHtmlParser(iframe.iframe)}
            <div>Critique will go here.</div>
        </div>
      )}
      </div>
    );
  }
}

export default Profile;
