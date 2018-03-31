import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Gravatar from 'react-gravatar';
import SignOut from './SignOut';
import Critique from './Critique';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', photo: '', usernameEdit: false, emailEdit: false, photoEdit: false, iframes: [], currentUserIframes: [], deletedIframe: {} };
    this.iframesRef = this.props.firebase.database().ref('iframes');
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.editEmail = this.editEmail.bind(this);
    this.showUsernameEdit = this.showUsernameEdit.bind(this);
    this.showEmailEdit = this.showEmailEdit.bind(this);
    this.deletePerformance = this.deletePerformance.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      console.log(user);
    } else {
      console.log('no user is signed in');
    }
});
    console.log(this.props.firebase.auth().currentUser);
    this.iframesRef.on('child_added', snapshot => {
      const iframe = snapshot.val();
      iframe.key = snapshot.key;
      console.log(iframe, iframe.key);
      let frames = this.state.iframes;
      frames.push(iframe);
      console.log(frames);
      if (this.props.user) {
        this.setState({ iframes: frames, currentUserIframes: this.state.iframes.filter(iframe => iframe.userUID === this.props.user.uid) });
      }
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
    console.log(this.props.firebase.auth().currentUser);
    this.props.firebase.auth().currentUser.updateEmail(email);
  }

  addUsername(username) {
    console.log(this.state.username);
    const user = this.props.firebase.auth().currentUser;
    console.log(this.props.firebase.auth().currentUser);
    user.updateProfile({displayName: username}).then(function() {
      alert("Username Added.").catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.code + error.message);
      });
    });
  }

  showUsernameEdit() {
    this.state.usernameEdit ? this.setState({ usernameEdit: false }) : this.setState({ usernameEdit: true });
  }

  showEmailEdit() {
    this.state.emailEdit ? this.setState({ emailEdit: false }) : this.setState({ emailEdit: true });
  }

  deletePerformance(iframe) {
    this.iframesRef.child(iframe.key).remove();
    console.log(this.props.activeIframe);
    this.setState({ deletedIframe: iframe, currentUserIframes: this.state.currentUserIframes.filter( iframe => iframe.key !== this.props.activeIframe.key )});
  }

  deleteUser() {

    alert("Are you sure you want to delete your account? This cannot be undone. All of your performances and critiques will also be deleted.");
    this.props.user.delete().then(function() {
    // User deleted.
    }).catch(function(error) {
    // An error happened.
    });
    this.state.currentUserIframes.forEach(iframe => this.deletePerformance(iframe));
  }

  render() {
    return(
      this.props.user ?
        <div className="Profile">
          <div className="edit-profile">
            <SignOut firebase={this.props.firebase} user={this.props.user}/>
            <h2>Profile</h2>
            < Gravatar email={this.props.user.email} size={150}/>
            <div className="profile-info">To add or update your profile picture, go to<a className="link" href="https://en.gravatar.com/">Gravatar</a></div>
            <div className="profile-info">Username: {this.props.user.displayName || 'No username yet.'}</div>
            <button className="button" onClick={() => this.showUsernameEdit()}>Edit</button>
            {this.state.usernameEdit ?
              <form className="profile-form" onSubmit={() => this.addUsername(this.state.username)}>
                <input className="profile-input" type="text" onChange={this.handleUsername}></input>
                <button className="button" type="submit">Submit</button>
              </form> : null
            }
            <div className="profile-info">Email: {this.props.user.email}</div>
            <button className="button" onClick={() => this.showEmailEdit()}>Edit</button>
            {this.state.emailEdit ?
              <form className="profile-form" onSubmit={() => this.editEmail(this.state.email)}>
                <input className="profile-input" type="text" onChange={this.handleEmail}></input>
                <button className="button" type="submit">Submit</button>
              </form> :
              null }
          </div>
          <div className="Performances">
            <h2>My Performances</h2>
            {this.state.currentUserIframes.map(iframe =>
              <div key={iframe.key} className="video">
                <p>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</p>
                <div className="iframe">{ReactHtmlParser(iframe.iframe)}</div>
                <button className="edit button" onClick={() => this.props.activateIframe(iframe)}>Edit</button>
                <div className={iframe.key === this.props.activeIframe.key ? "critique" : "no-show"}>
                  < Critique firebase={this.props.firebase} activeIframe={this.props.activeIframe} activateIframe={this.props.activateIframe} user={this.props.user}/>
                  <button className="delete button" onClick={() => this.deletePerformance(iframe)}>Delete Performance</button>
                </div>
              </div>
            )}
          </div>
          <div className="delete-account">
            <p>Want to cancel your account?</p>
            <button className="delete button" onClick={() => this.deleteUser()}>Cancel My Account</button>
          </div>
        </div> : null
    );
  }
}

export default Profile;
