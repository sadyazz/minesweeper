import Cell from './Cell'
import { TBoard } from '../types'

type Props = {
    gameBoard: TBoard;
    handleCellLeftClick: (row:number, column:number)=>void;
}

const Board = (props:Props) => {
    const {gameBoard, handleCellLeftClick} = props;
  return (
    <div className="board">
    {gameBoard.map((row, rowIndex) => (
    <div className="flex"> {row.map((cell, cellIndex) => (
    <Cell cell={cell} rowIndex={rowIndex} cellIndex={cellIndex} handleCellLeftClick={handleCellLeftClick} />
    ))}
    </div>
    ))}
    </div>
  )
}

export default Board