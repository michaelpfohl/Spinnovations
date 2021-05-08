import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../../Helpers/Interfaces/UserInterfaces';
import userData from '../../Helpers/Data/userData';

type AuthProps = {
  user: User | null
}

class Auth extends Component<AuthProps> {
  state = {
    greetingColor: 0,
  };

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

  componentDidMount(): void {
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1})
  }

  logoutClickEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    window.sessionStorage.removeItem('token');
    firebase.auth().signOut();
    window.location.href = '/';
  };

  logInOrOut = (): JSX.Element => {
    const { user } = this.props;
    const { greetingColor } = this.state;
    if (user == false){
      return (
        <div className="d-flex justify-content-center">
            <button className="signin-button google-logo" onClick={this.loginClickEvent}>
            <i className="fas fa-sign-out-alt"></i> Sign In
            </button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="auth-container d-flex align-items-center">
            <p className={`m-auto greeting-text color-text-${greetingColor}`}>Hello, {user?.display_Name}!</p>
            <button className="google-logo ml-4 logout-button" onClick={this.logoutClickEvent}>
              <i className="fas fa-sign-out-alt signout-icon"></i> Log Out
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
