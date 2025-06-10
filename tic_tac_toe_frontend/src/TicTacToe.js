import React, { useState } from 'react';

/*
  Main Container for TicTacToe

  - 3x3 grid
  - Player turn indicator
  - Win/draw detection
  - Reset button
  - Minimalist, clear UI using the color theme:
    -- primary: #ffffff (for backgrounds)
    -- secondary: #000000 (for text/lines)
    -- accent: #2196f3   (for highlights/buttons)
*/

// Styles specific to the TicTacToe component
const boardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 64px)',
  gridTemplateRows: 'repeat(3, 64px)',
  gap: '12px',
  background: '#fff',
  borderRadius: '14px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
  padding: '20px 24px'
};

const cellStyle = {
  width: '64px',
  height: '64px',
  fontSize: '2.25rem',
  color: '#000',
  border: '2px solid #2196f3',
  borderRadius: '8px',
  background: 'transparent',
  outline: 'none',
  cursor: 'pointer',
  fontWeight: 700,
  textAlign: 'center',
  transition: 'background 0.15s, color 0.2s, box-shadow 0.1s'
};

const cellHighlightStyle = {
  background: '#2196f340',
  color: '#2196f3'
};

const turnIndicatorStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '24px',
  color: '#000'
};

const resultStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '20px',
  color: '#2196f3',
};

const resetButtonStyle = {
  background: '#2196f3',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '10px 24px',
  fontWeight: 600,
  fontSize: '1rem',
  marginTop: '32px',
  cursor: 'pointer',
  transition: 'background 0.2s'
};


// Helper to calculate winner and winning cells
function calculateWinner(board) {
  // All possible win lines/cells
  const lines = [
    [0,1,2],[3,4,5], [6,7,8],      // rows
    [0,3,6],[1,4,7],[2,5,8],       // cols
    [0,4,8], [2,4,6]               // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return { winner: board[a], line };
    }
  }
  return null;
}


// PUBLIC_INTERFACE
export default function TicTacToe() {
  /**
   * Minimalist TicTacToe component.
   * Two players ("X" and "O") take turns.
   * Implements win/draw detection and a Reset button.
   * Uses provided color theme and layout.
   */

  // Board: 9 elements array, initialized to null
  const [board, setBoard] = useState(Array(9).fill(null));
  // true => "X"'s turn, false => "O"'s turn
  const [xIsNext, setXIsNext] = useState(true);
  // If game is finished, stores winner or 'draw'
  const [gameStatus, setGameStatus] = useState(null); // null | {winner, line} | 'draw'

  const handleCellClick = idx => {
    if (board[idx] !== null || gameStatus) return; // Occupied or game ended

    const nextBoard = [...board];
    nextBoard[idx] = xIsNext ? 'X' : 'O';

    const winnerObj = calculateWinner(nextBoard);
    let result = null;
    if (winnerObj) {
      result = winnerObj;
    } else if (nextBoard.every(cell => cell !== null)) {
      result = 'draw';
    }

    setBoard(nextBoard);
    setXIsNext(x => !x);
    setGameStatus(result);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus(null);
  };

  // Find highlight for winning cells, if any
  let winningLine = null;
  let displayResult = null;
  if (gameStatus && gameStatus !== 'draw' && gameStatus.winner) {
    winningLine = gameStatus.line;
    displayResult = `Winner: ${gameStatus.winner}`;
  } else if (gameStatus === 'draw') {
    displayResult = `It's a draw!`;
  }

  return (
    <div style={boardContainerStyle} data-testid="tictactoe-container">
      <div style={turnIndicatorStyle} data-testid="turn-indicator">
        {!gameStatus ? (
          <>Turn: <span style={{color: '#2196f3'}}>{xIsNext ? "X" : "O"}</span></>
        ) : (
          <span>Game Over</span>
        )}
      </div>
      {displayResult &&
        <div style={resultStyle} data-testid="game-result">
          {displayResult}
        </div>
      }

      <div style={gridStyle} data-testid="board">
        {board.map((cell, idx) => {
          // Highlight cell if part of the winning line
          const highlight = winningLine && winningLine.includes(idx);
          return (
            <button
              aria-label={`cell ${idx + 1}`}
              key={idx}
              style={{
                ...cellStyle,
                ...(highlight ? cellHighlightStyle : {}),
                cursor:
                  cell === null && !gameStatus
                    ? 'pointer'
                    : 'not-allowed',
                color: highlight ? '#2196f3' : (cell === 'X' ? '#000' : '#2196f3'),
                borderColor: cell === 'O' ? '#2196f3' : '#000'
              }}
              onClick={() => handleCellClick(idx)}
              disabled={cell !== null || !!gameStatus}
              data-testid={`cell-${idx}`}
            >
              {cell || ''}
            </button>
          );
        })}
      </div>

      <button
        style={resetButtonStyle}
        onClick={handleReset}
        type="button"
        data-testid="reset-button"
      >
        Reset Game
      </button>
    </div>
  );
}
