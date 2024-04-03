import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Admin from './Admin';

const PageRouter = () => {
  // timer values
  const timerLength = 5;
  const playerTime = new Date();
  playerTime.setSeconds(playerTime.getSeconds() + timerLength);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={ <Admin expiryTimestamp={playerTime} /> } />
        <Route path="/" element={ <App /> } />
      </Routes>
    </Router>
  );
};

export default PageRouter;