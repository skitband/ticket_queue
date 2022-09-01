import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from './components/Main';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
          <Main />
      </Router>
      
    </div>
  );
}

export default App;
