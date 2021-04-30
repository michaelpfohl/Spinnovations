import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../../Helpers/Interfaces/UserInterfaces';
import userData from '../../Helpers/Data/userData';

type AuthProps = {
  user: User | null
}

class Auth extends Component<AuthProps> {
  state = {};

  loginClickEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user) => {
      if (user.additionalUserInfo?.isNewUser){
        const userInfo = {
          display_Name: user.user?.displayName,
          image_Url: user.user?.photoURL,
          firebase_Uid: user.user?.uid,
          email: user.user?.email,
        }
        userData.AddNewUser(userInfo);
      }
    });
  };

  logoutClickEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    window.sessionStorage.removeItem('token');
    firebase.auth().signOut();
    window.location.href = '/';
  };

  logInOrOut = (): JSX.Element => {
    const { user } = this.props;
    if (user == false){
      return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-secondary google-logo" onClick={this.loginClickEvent}>
              Sign In
            </button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="auth-container d-flex">
            <p className="mr-4">Hello, {user?.display_Name}!</p>
            <button className="btn btn-secondary google-logo" onClick={this.logoutClickEvent}>
              Log Out
            </button>
          </div>
        </div>
      );
    }
  }

  render(): JSX.Element {
    return (
      <div className="d-flex justify-content-center">
        {this.logInOrOut()}
      </div>
    );
  }
}

export default Auth;
