import "./App.css";
import Board from "./components/Board";
import SelectLevel from "./components/SelectLevel";
import useMinesweeperGame from "./hooks/useMinesweeperGame";

function App() {
  const {
    gameBoard,
    handleCellLeftClick,
    level,
    changeLevel,
    handleCellRightClick,
  } = useMinesweeperGame();

  return (
    <div className="p-2 px-6 rounded-xl game">
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
