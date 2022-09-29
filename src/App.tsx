import React, { FocusEvent, KeyboardEvent, useEffect } from 'react';
import logo from './logo.svg';

import './App.css';
import './routes'
import AppRoute from './routes';
import { HashRouter } from 'react-router-dom'
import ExtraPages from './pages/ExtraPages';

function App() {
  const style = {
    display: "flex", 
    width: "479px",
    height: "320px",
    'user-select': "none",
    'cursor': "hidden"
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={style}>
          <HashRouter>
            <AppRoute></AppRoute>
            <ExtraPages></ExtraPages>
          </HashRouter>
        </div>
      </header>
    </div>
  );
}

export default App;
