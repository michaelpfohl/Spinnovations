import React, { ReactElement, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/auth';
import fbConnection from '../Helpers/fbConnection';
import './App.scss';
import Routes from '../Helpers/routes';

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount(): void {
    this.removeListener = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        user.getIdToken().then((token: string) => sessionStorage.setItem("token", token));
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }
  componentWillUnmount(): void {
    this.removeListener();
  }
  
  render() {
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  }
}

export default App;
