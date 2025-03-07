import clsx from "clsx";
import { cell_numbers_colors } from "../constants";
import mineIcon from "/icons/bomb.svg";
import flagIcon from "/icons/red-flag.png";
import { GameCell, TLevel } from "../types";
import { MouseEvent } from "react";

type CellProps = {
  cell: GameCell;
  rowIndex: number;
  cellIndex: number;
  handleCellLeftClick: (row: number, column: number) => void;
  handleCellRightClick: (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    column: number
  ) => void;
  level: TLevel;
};

const Cell = ({
  cell,
  rowIndex,
  cellIndex,
  handleCellLeftClick,
  level,
  handleCellRightClick,
}: CellProps) => {
  return (
    <div
      className={clsx(
        "cell",
        typeof cell.value === "number" && cell_numbers_colors[cell.value],
        cell.value === "mine" && cell.highlight,
        level !== "easy" && "small"
      )}
      onClick={() => handleCellLeftClick(rowIndex, cellIndex)}
      onContextMenu={(e) => handleCellRightClick(e, rowIndex, cellIndex)}
    >
      {typeof cell.value === "number" && <>{cell.value || ""}</>}
      {cell.value === "mine" && (
        <img className="w-[75%] h-[75%]" src={mineIcon} alt="mine" />
      )}
      {!cell.isOpened && (
        <div className="overlay w-full h-full border-solid border-[2.25px] flex justify-center items-center absolute">
          <img
            src={flagIcon}
            alt="flag"
            className={clsx("flag", cell.isFlagged && "visible")}
          />
        </div>
      )}
    </div>
  );
};

export default Cell;
