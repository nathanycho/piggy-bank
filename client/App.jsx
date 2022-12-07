import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="router">
        <main className="routerMain">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;