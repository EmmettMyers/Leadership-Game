import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Admin from './Admin';

const PageRouter = () => {
  // timer values
  const timerLength = 60;
  const playerTime = new Date();
  playerTime.setSeconds(playerTime.getSeconds() + timerLength);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={ <Admin timerValue={timerLength} expiryTimestamp={playerTime} /> } />
        <Route path="/" element={ <App timerValue={timerLength} /> } />
      </Routes>
    </Router>
  );
};

export default PageRouter;