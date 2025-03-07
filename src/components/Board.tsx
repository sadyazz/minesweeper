import Cell from "./Cell";
import { TBoard, TLevel } from "../types";
import { MouseEvent } from "react";

type Props = {
  gameBoard: TBoard;
  handleCellLeftClick: (row: number, column: number) => void;
  handleCellRightClick: (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    column: number
  ) => void;
  level: TLevel;
};

const Board = (props: Props) => {
  const { gameBoard, handleCellLeftClick, level, handleCellRightClick } = props;
  return (
    <div className="board">
      {gameBoard.map((row, rowIndex) => (
        <div className="flex">
          {" "}
          {row.map((cell, cellIndex) => (
            <Cell
              cell={cell}
              rowIndex={rowIndex}
              cellIndex={cellIndex}
              handleCellLeftClick={handleCellLeftClick}
              level={level}
              handleCellRightClick={handleCellRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
