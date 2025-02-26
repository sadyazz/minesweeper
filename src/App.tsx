
import './App.css'
import Board from './components/Board'
import useMinesweeperGame from './hooks/useMinesweeperGame'

function App() {

  const {gameBoard, handleCellLeftClick} = useMinesweeperGame();

  return (
    <div className='p-2 px-6 rounded-xl game'>
      <Board gameBoard={gameBoard} handleCellLeftClick={handleCellLeftClick} />
    </div>
  )
}

export default App
