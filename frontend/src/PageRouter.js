import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Admin from './Admin';

const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={ <Admin /> } />
        <Route path="/" element={ <App /> } />
      </Routes>
    </Router>
  );
};

export default PageRouter;