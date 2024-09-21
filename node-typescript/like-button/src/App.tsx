import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LinkButton />
      </header>
    </div>
  );
}

function LinkButton() {
  const count = 999;
  return <span className="linkButton">♥ {count}</span>;
}

export default App;
