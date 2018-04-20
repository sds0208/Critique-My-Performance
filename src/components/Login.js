import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      event.preventDefault();
      this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        console.log(error.code);
        alert(error.message);
      });
      this.setState({ email: '', password: '' });
    }


  render() {
    return (
      <div className="Login">
        <div className="login">
          <form onSubmit={(event) => this.loginUser(event)} className="sign-up-form">
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmail}/>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePassword}/>
            <button className="button" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
