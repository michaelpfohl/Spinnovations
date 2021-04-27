import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
// import googleLogo from '../../assets/images/googleLogo.png';

class Auth extends Component {
  state = {};

  loginClickEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render(): JSX.Element {
    return (
      <div className="d-flex justify-content-center">
        <div className="auth-container">
          <h1 className="auth-header">Hello and welcome to Gnophy!</h1>
          <h3 className="auth-subheader">Please sign in in order to use the app.</h3>
          <button className="btn btn-secondary google-logo" onClick={() => this.loginClickEvent}>
            {/* <img src={googleLogo} alt="Google Sign In Button"></img> */}
            Sign In Button
          </button>
        </div>
      </div>
    );
  }
}

export default Auth;
