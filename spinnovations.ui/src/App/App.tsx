import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import fbConnection from '../Helpers/fbConnection';
import './App.scss';
import Routes from '../Helpers/routes';

fbConnection();

type AppState = {
  user?: any;
}

class App extends Component<AppState> {
  state = {
    user: null
  };

  componentDidMount(this: any): void {
    this.removeListener = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        user.getIdToken().then((token: string) => sessionStorage.setItem("token", token));
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }
  componentWillUnmount(this: any): void {
    this.removeListener();
  }
  
  render(): JSX.Element {
    return <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>;
  }
}

export default App;
