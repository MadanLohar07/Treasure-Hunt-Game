import React, { useState } from "react";
import "./App.css";

const SquareGame = () => {
  const [squares, setSquares] = useState(Array(64).fill(null));
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [randomSquares, setRandomSquares] = useState(
    generateRandomSquares(8, 8)
  );
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function generateRandomSquares(width, height) {
    const totalSquares = width * height;
    const randomIndexes = [];
    const numSquares = totalSquares === 1 ? 1 : 2;
    while (randomIndexes.length < numSquares) {
      const randomIndex = Math.floor(Math.random() * totalSquares);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes;
  }

  const handleSquareClick = (index) => {
    if (attempts >= 6 || message) return;
    if (!selected.includes(index)) {
      const newSelected = [...selected, index];
      setSelected(newSelected);
      setAttempts(attempts + 1);

      const newSquares = [...squares];
      if (randomSquares.includes(index)) {
        newSquares[index] = "correct";
        setMessage("You won the game!");
        setIsModalOpen(true);
      } else {
        newSquares[index] = "wrong";
        if (attempts + 1 >= 6) {
          setMessage("You lost the game!");
          setIsModalOpen(true);
        }
      }
      setSquares(newSquares);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setSquares(Array(width * height).fill(null));
    setSelected([]);
    setRandomSquares(generateRandomSquares(width, height));
    setAttempts(0);
    setMessage("");
  };

  const handleSetGrid = () => {
    if (width > 0 && height > 0) {
      setSquares(Array(width * height).fill(null));
      setSelected([]);
      setAttempts(0);
      setMessage("");
      setRandomSquares(generateRandomSquares(width, height));
    }
  };

  const handleWidthChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= 20) {
      setWidth(value);
    }
  };

  const handleHeightChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= 20) {
      setHeight(value);
    }
  };

  return (
    <>
      <div className="main">
        <div className="game">
          <h1>TREASURE HUNT GAME</h1>
          <div className="set-WH">
            <label>No. of Squares (Horizontal)</label>
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
            />{" "}
            <br />
            <label>No. of Squares (Vertical)</label>
            <input type="number" value={height} onChange={handleHeightChange} />
            <button className="set-btn" onClick={handleSetGrid}>
              Set
            </button>
          </div>
          <div className="grid-container">
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows: `repeat(${height}, 1fr)`,
              }}
            >
              {squares.map((state, index) => (
                <div
                  key={index}
                  className={`square ${state}`}
                  onClick={() => handleSquareClick(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{message}</p>
            <button onClick={handleCloseModal}>Try again</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SquareGame;
