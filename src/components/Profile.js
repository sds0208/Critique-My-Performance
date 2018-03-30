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
    //this.handlePhoto = this.handlePhoto.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.editEmail = this.editEmail.bind(this);
    //this.editPhoto = this.editPhoto.bind(this);
    this.showUsernameEdit = this.showUsernameEdit.bind(this);
    this.showEmailEdit = this.showEmailEdit.bind(this);
    this.deletePerformance = this.deletePerformance.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.iframesRef.on('child_added', snapshot => {
      const iframe = snapshot.val();
      iframe.key = snapshot.key;
      if (this.props.user) {
        this.setState({ iframes: this.state.iframes.concat( iframe ), currentUserIframes: this.state.iframes.filter(iframe => iframe.userUID === this.props.user.uid) });
      }
    });
    //console.log(this.props.user.photoUrl);
  }

  handleUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value});
  }

  handleEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  /*handlePhoto(event) {
    event.preventDefault();
    this.setState({ photo: event.target.value });
  }*/

  editEmail(email) {
    console.log(email);
    this.props.firebase.auth().currentUser.updateEmail(email);
  }

  addUsername(username) {
    const user = this.props.firebase.auth().currentUser;
    const userProvidedPassword = prompt("Please enter your password to make this change.");
    const credential = this.props.firebase.auth.EmailAuthProvider.credential(
      user.email,
      userProvidedPassword
    );
    // Prompt the user to re-provide their sign-in credentials

    user.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
      this.props.firebase.auth().currentUser.updateProfile({displayName: username});
    }).catch(function(error) {
      // An error happened.
    });
    this.props.firebase.auth().currentUser.updateProfile({displayName: username});
  }

  /*editPhoto(photo) {
    this.props.firebase.auth().currentUser.updateProfile({photoURL: photo});
  }*/

  showUsernameEdit() {
    this.state.usernameEdit ? this.setState({ usernameEdit: false }) : this.setState({ usernameEdit: true });
  }

  showEmailEdit() {
    this.state.emailEdit ? this.setState({ emailEdit: false }) : this.setState({ emailEdit: true });
  }

  /*showPhotoEdit() {
    this.setState({ photoEdit: true });
  }*/

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
      <div className="Profile">
      {this.props.user ?
        <div className="edit-profile">
          <SignOut firebase={this.props.firebase} user={this.props.user}/>
          <h2>Profile</h2>
          < Gravatar email={this.props.user.email} />
          {this.props.user.displayName ?
            <div>
              <div className="profile-info">Username: {this.props.user.displayName}</div>
              <button className="button" onClick={() => this.showUsernameEdit()}>Edit</button>
              {this.state.usernameEdit ?
                <form className="profile-form" onSubmit={() => this.addUsername(this.state.username)}>
                  <input className="profile-input" type="text" onChange={this.handleUsername}></input>
                  <button className="button" type="submit">Submit</button>
                </form> : null
              }
            </div> :
            <div>
              <div>Username: No username yet.</div>
              <form className="profile-form" onSubmit={() => this.addUsername(this.state.username)}>
                <input className="profile-input" type="text" onChange={this.handleUsername}></input>
                <button className="button" type="submit">Submit</button>
              </form>
            </div>}
            {/*{this.props.user.photoUrl ?
              <div>
                <div className="profile-info">Username: {this.props.user.photoUrl}</div>
                <button onClick={() => this.showPhotoEdit()}>Edit</button>
                {this.state.photoEdit ?
                  <form className="profile-form" onSubmit={() => this.editPhoto(this.state.photo)}>
                    <input type="text" onChange={this.handlePhoto}></input>
                    <button type="submit">Add</button>
                  </form> : null
                }
              </div> :
              <div>
                <div>Photo: No photo yet.</div>
                <form className="profile-form" onSubmit={() => this.editPhoto(this.state.photo)}>
                  <input type="text" onChange={this.editPhoto}></input>
                  <button type="submit">Add</button>
                </form>
              </div>}*/}
          <div className="profile-info">Email: {this.props.user.email}</div>
          <button className="button" onClick={() => this.showEmailEdit()}>Edit</button>
          {this.state.emailEdit ?
            <form className="profile-form" onSubmit={() => this.editEmail(this.state.email)}>
              <input className="profile-input" type="text" onChange={this.handleEmail}></input>
              <button className="button" type="submit">Submit</button>
            </form> :
            null }

            <h2>My Performances</h2>
            {this.state.currentUserIframes.map(iframe =>
              <div key={iframe.key} className="video">
                <h5>Posted by {iframe.userName || iframe.userEmail} on {iframe.timeAdded[0]} at {iframe.timeAdded[1]}</h5>
                {ReactHtmlParser(iframe.iframe)}
                <button className="edit button" onClick={() => this.props.activateIframe(iframe)}>Edit</button>
                <div className={iframe.key === this.props.activeIframe.key ? "critique" : "no-show"}>
                  < Critique firebase={this.props.firebase} activeIframe={this.props.activeIframe} activateIframe={this.props.activateIframe} user={this.props.user}/>
                  <button className="delete button" onClick={() => this.deletePerformance(iframe)}>Delete Performance</button>
                </div>
              </div>
            )}
          <div className="delete-account">
            <p>Want to cancel your account?</p>
            <button className="delete button" onClick={() => this.deleteUser()}>Cancel My Account</button>
          </div>
        </div> : null
      }

      </div>
    );
  }
}

export default Profile;
