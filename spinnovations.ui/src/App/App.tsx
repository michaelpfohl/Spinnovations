import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import fbConnection from '../Helpers/fbConnection';
import './App.scss';
import Routes from '../Helpers/routes';
import userData from '../Helpers/Data/userData';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import Navigation from '../Components/Navbar';

fbConnection();

type AppState = {
  user?: User | boolean;
}

class App extends Component<AppState> {
  state = {
    user: null
  };

  removeListener = (noop: void): void => noop;

  componentDidMount(): void {
    this.removeListener = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        user.getIdToken().then((token: string) => sessionStorage.setItem("token", token));
        userData.getUserByFirebaseUid(user.uid).then((response) => {
          this.setState({ user: response });
        });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount(): void {
    this.removeListener();
  }
  
  render(): JSX.Element {
    const { user } = this.state;
    return <div className="App">
      <Router>
        <Navigation user={user}/>
        <Routes user={user}/>
      </Router>
    </div>;
  }
}

export default App;
