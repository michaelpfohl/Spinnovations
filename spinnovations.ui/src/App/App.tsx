import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../Helpers/routes';
import Navigation from '../Components/Navbar';

const App: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <Router>
        <Navigation>
          <Routes />
        </Navigation>
      </Router>
    </div>
  );
};

export default App;
