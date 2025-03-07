import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import SelectLevel from "./components/SelectLevel";
import useMinesweeperGame from "./hooks/useMinesweeperGame";

function App() {
  const {
    gameBoard,
    handleCellLeftClick,
    level,
    changeLevel,
    handleCellRightClick,
    isGameWin,
    isGameOver,
    isGameEnded,
    minesLeft,
    timeDiff,
    startNewGame,
    restartGame,
  } = useMinesweeperGame();

  return (
    <div className="p-2 px-6 rounded-xl game">
      <Header
        isGameWin={isGameWin}
        isGameOver={isGameOver}
        isGameEnded={isGameEnded}
        minesLeft={minesLeft}
        timeDiff={timeDiff}
        startNewGame={startNewGame}
        restartGame={restartGame}
      />
      <Board
        gameBoard={gameBoard}
        handleCellLeftClick={handleCellLeftClick}
        level={level}
        handleCellRightClick={handleCellRightClick}
      />
      <SelectLevel level={level} changeLevel={changeLevel} />
    </div>
  );
}

export default App;
