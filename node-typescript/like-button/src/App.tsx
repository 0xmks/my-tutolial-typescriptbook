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
  return <span>イイねボタン予定地</span>
}

export default App;
