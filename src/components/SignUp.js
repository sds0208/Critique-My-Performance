import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      newPassword: '',
      newPasswordConfirmation: ''};
      this.handleEmailInput = this.handleEmailInput.bind(this);
      this.handlePasswordInput = this.handlePasswordInput.bind(this);
      this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
      this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  handleEmailInput(event) {
    event.preventDefault();
    this.setState({ newEmail: event.target.value});
  }

  handlePasswordInput(event) {
    event.preventDefault();
    this.setState({ newPassword: event.target.value});
  }

  handlePasswordConfirmation(event) {
    event.preventDefault();
    this.setState({ newPasswordConfirmation: event.target.value});
  }

  createUser(event) {
      event.preventDefault();
      const isInvalid =
        this.state.newPassword !== this.state.newPasswordConfirmation ||
        this.state.newPassword === null ||
        this.state.newEmail.includes('@') === false;
        if (!isInvalid) {
          this.props.firebase.auth().createUserWithEmailAndPassword(this.state.newEmail, this.state.newPassword).catch(function(error) {
            console.log(error.code);
            alert(error.message);
          });
        } else {
        alert('There was an error creating your account. Please try again.')
        this.setState({ newDisplayName: '', newEmail: '', newPassword: '', newPasswordConfirmation: ''});
      }
    }


  render() {
    return (
      <div className="SignUp">

        <div className="sign-up">
          <p>Sign up today to get feedback from musicians around the world!</p>
          <form onSubmit={(event) => this.createUser(event)} className="sign-up-form">
            Email:
            <input type="text" value={this.state.newEmail} onChange={this.handleEmailInput}/>
            Password:
            <input type="password" value={this.state.newPassword} onChange={this.handlePasswordInput}/>
            Confirm Password:
            <input type="password" value={this.state.newPasswordConfirmation} onChange={this.handlePasswordConfirmation}/>
            <button className="button" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
