import { useState } from "react";
import excited from "./assets/excited.gif";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningCombo, setWinningCombo] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningCombo(result.combo);
    } else if (!newBoard.includes("")) {
      setIsDraw(true);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const checkWinner = (b) => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b1, c] = combo;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return { winner: b[a], combo };
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setWinningCombo([]);
    setTurn("X");
    setIsDraw(false);
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li>Tic Tac Toe</li>
        </ul>
      </nav>

      <div className="gameContainer">
        <div className="board-wrapper">
          <div className="container">
            {board.map((val, i) => (
              <div
                key={i}
                className={`box ${winningCombo.includes(i) ? "highlight" : ""}`}
                onClick={() => handleClick(i)}
              >
                <span className="boxtext">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gameInfo">
          <h1>Tic Tac Toe</h1>
          <span className="info">
            {winner
              ? `${winner} Won 🎉`
              : isDraw
              ? "It's a Draw 😐"
              : `Turn for ${turn}`}
          </span>

          <button id="reset" onClick={resetGame}>
            Reset
          </button>

          {winner && (
            <div className="giftbox">
              <img src={excited} alt="Gift" className="gift-image" />
              <p>Congratulations {winner}! You earned a gift 🎁</p>
            </div>
          )}

          {isDraw && !winner && (
            <div className="giftbox">
              <p>It's a Draw! Nobody wins 😅</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
