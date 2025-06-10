import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  // Swap template for TicTacToe main container
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <div />
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <div style={{ paddingTop: 120 }}>
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;