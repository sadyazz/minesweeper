import Cell from './Cell'
import { TBoard, TLevel } from '../types'

type Props = {
    gameBoard: TBoard;
    handleCellLeftClick: (row:number, column:number)=>void;
    level: TLevel;
}

const Board = (props:Props) => {
    const {gameBoard, handleCellLeftClick, level} = props;
  return (
    <div className="board">
    {gameBoard.map((row, rowIndex) => (
    <div className="flex"> {row.map((cell, cellIndex) => (
    <Cell cell={cell} rowIndex={rowIndex} cellIndex={cellIndex} handleCellLeftClick={handleCellLeftClick} level={level}/>
    ))}
    </div>
    ))}
    </div>
  )
}

export default Board