import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import fbConnection from '../Helpers/fbConnection';
import './App.scss';
import Routes from '../Helpers/routes';
import userData from '../Helpers/Data/userData';

fbConnection();

type AppState = {
  user?: any | boolean;
}

class App extends Component<AppState> {
  state = {
    user: null
  };

  componentDidMount(this: any): void {
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

  componentWillUnmount(this: any): void {
    this.removeListener();
  }
  
  render(): JSX.Element {
    const { user } = this.state;
    console.log(user);
    return <div className="App">
      <Router>
        <Routes user={user}/>
      </Router>
    </div>;
  }
}

export default App;
