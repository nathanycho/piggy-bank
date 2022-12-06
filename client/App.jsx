import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;