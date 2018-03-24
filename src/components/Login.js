import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value});
  }

  handlePassword(event) {
    event.preventDefault();
    this.setState({ password: event.target.value});
  }

  loginUser(event) {
    /*const isInvalid =
      this.state.newPassword !== this.state.passwordConfirmation ||
      this.state.newPassword === '' ||
      this.state.newEmail === '' ||
      this.state.newDisplayName === '';*/
      event.preventDefault();
      this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      console.log(this.state);
      this.setState({ email: '', password: '' });
      //console.log(this.props.firebase.auth().currentUser.displayName);
    }


  render() {
    return (
      <div className="Login">
        <div className="login">
          <form onSubmit={(event) => this.loginUser(event)} className="sign-up-form">
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmail}/>
            Password:
            <input type="text" value={this.state.password} onChange={this.handlePassword}/>
            <button className="button" type="submit"><Link id="submit-link" to='/'>Sign In</Link></button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
