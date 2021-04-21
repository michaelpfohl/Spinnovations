import React, { ReactElement } from 'react';
import './App.scss';

const App: React.FC = (): ReactElement => {
  return (
    <div className='App'>
      <h2>INSIDE APP COMPONENT</h2>
      <button className='btn btn-info'>I am a button</button>
    </div>
  );
}

export default App;
