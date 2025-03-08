import { MouseEvent, useCallback, useEffect, useState } from "react";
import {
  checkGameWin,
  initGame,
  revealAllMines,
  revealEmptyCells,
} from "../utils";
import { TBoard, TLevel } from "../types";
import { defaultLevel, levels } from "../constants";
import useTimer from "./useTimer";

const useMinesweeperGame = () => {
  const [level, setLevel] = useState<TLevel>(defaultLevel);
  const currentLevel = levels[level];

  const changeLevel = useCallback((selectedLevel: TLevel) => {
    setLevel(selectedLevel);
  }, []);

  const [gameBoard, setGameBoard] = useState(
    initGame(
      levels[defaultLevel].rows,
      levels[defaultLevel].columns,
      levels[defaultLevel].mines
    )
  );

  useEffect(() => {
    startNewGame();
  }, [level]);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);
  const isGameEnded = isGameOver || isGameWin;
  
  const [totalFlags, setTotalFlags] = useState(0);
  const minesLeft = currentLevel.mines - totalFlags;
  
  const { timeDiff, isTimerRunning, startTimer, stopTimer, resetTimer } = useTimer();

  const resetBoard = useCallback(
    (isRestart?: boolean) => {
      stopTimer();
      resetTimer();
      setTotalFlags(0);
      setIsGameOver(false);
      setIsGameWin(false);

      if (isRestart) {
        setGameBoard((prevGameBoard) =>
          prevGameBoard.map((row) =>
            row.map((cell) => {
              return {
                value: cell.value,
                isFlagged: false,
                isOpened: false,
              };
            })
          )
        );
      } else {
        setGameBoard(
          initGame(
            currentLevel.rows,
            currentLevel.columns,
            currentLevel.mines
          )
        );
      }
    },
    [currentLevel, resetTimer, stopTimer]
  );

  const startNewGame = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  const restartGame = useCallback(() => {
    resetBoard(true);
  }, [resetBoard]);
 
  useEffect(()=>{
    if(isGameEnded){
        stopTimer();
    }
  },[isGameEnded, stopTimer])

  const openCell = (board: TBoard, row: number, column: number) => {
    if(!isTimerRunning) startTimer();

    const newGameBoard: TBoard = JSON.parse(JSON.stringify(board));
    const cell = newGameBoard[row][column];
    const isMineCell = cell.value === "mine";
    const isNumberCell = typeof cell.value === "number" && cell.value > 0;
    const isEmptyCell = typeof cell.value === "number" && cell.value === 0;

    if (isMineCell) {
      setIsGameOver(true);
      cell.highlight = "red";
      revealAllMines(newGameBoard);
    }

    if (!isMineCell) {
      cell.isOpened = true;

      if (isEmptyCell) {
        revealEmptyCells(
          newGameBoard,
          currentLevel.rows,
          currentLevel.columns,
          row,
          column
        );
      }

      if (checkGameWin(newGameBoard, currentLevel.mines)) {
        setIsGameWin(true);
        revealAllMines(newGameBoard, true);
      }
    }
    return newGameBoard;
  };

  const handleCellLeftClick = (row: number, column: number) => {
    if (
      isGameEnded ||
      gameBoard[row][column].isOpened ||
      gameBoard[row][column].isFlagged
    ) {
      return null;
    }

    const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));

    const boardAfterOpeningCell = openCell(newGameBoard, row, column);

    if (boardAfterOpeningCell) {
      setGameBoard(boardAfterOpeningCell);
    }
  };

  const handleCellRightClick = (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    column: number
  ) => {
    e.preventDefault();

    if (isGameEnded || gameBoard[row][column].isOpened) return;

    if(!isTimerRunning) startTimer();

    let flagsDiff = 0;

    setGameBoard((prevGameBoard) => {
      const newGameBoard: TBoard = JSON.parse(JSON.stringify(prevGameBoard));
      const cell = prevGameBoard[row][column];

      if (cell.isFlagged) {
        newGameBoard[row][column].isFlagged = false;
        if (!flagsDiff) flagsDiff--;
      }

      if (!cell.isFlagged) {
        newGameBoard[row][column].isFlagged = true;
        if (!flagsDiff) flagsDiff++;
      }

      return newGameBoard;
    });

    setTotalFlags((prevTotalFlags) => prevTotalFlags + flagsDiff);
  };

  return {
    level,
    changeLevel,
    gameBoard,
    handleCellLeftClick,
    handleCellRightClick,
    isGameWin,
    isGameOver,
    isGameEnded,
    minesLeft, 
    timeDiff,
    startNewGame,
    restartGame
  };
};

export default useMinesweeperGame;
