import { useCallback, useState } from "react";
import { checkGameWin, initGame, revealAllMines, revealEmptyCells } from "../utils";
import { TBoard, TLevel } from "../types";
import { defaultLevel, levels } from "../constants";

const useMinesweeperGame = ()=>{
    const [level, setLevel] = useState<TLevel>(defaultLevel);
    const currentLevel = levels[level];

    const changeLevel = useCallback((selectedLevel:TLevel)=>{
        setLevel(selectedLevel);
    }, []);
    
    const [gameBoard, setGameBoard] = useState(
        initGame(
            levels[defaultLevel].rows,
            levels[defaultLevel].columns, 
            levels[defaultLevel].mines
        ));
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);
    const isGameEnded = isGameOver || isGameWin;

    const openCell = (board:TBoard, row:number, column:number) => { 
        const newGameBoard: TBoard = JSON.parse(JSON.stringify(board));
        const cell = newGameBoard[row][column];
        const isMineCell = cell.value === 'mine';
        const isNumberCell = typeof cell.value === 'number' && cell.value > 0;
        const isEmptyCell = typeof cell.value === 'number' && cell.value === 0;

        if(isMineCell){
            setIsGameOver(true);
            cell.highlight = 'red';
            revealAllMines(newGameBoard);
        }

        if(!isMineCell){
            cell.isOpened = true;
            if(isNumberCell){
                console.log("number cell");
            }

            if(isEmptyCell){
                revealEmptyCells(newGameBoard, currentLevel.rows, currentLevel.columns, row, column);
                console.log("empty cell");
            }

            if(checkGameWin(newGameBoard, currentLevel.mines)){
                setIsGameWin(true);
                revealAllMines(newGameBoard, true);
            }
        }
        return newGameBoard;
        
    }
    
    const handleCellLeftClick = (row:number, column:number) => {
        if(isGameEnded || gameBoard[row][column].isOpened || gameBoard[row][column].isFlagged){
            return null;
        }

        const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));
        
        const boardAfterOpeningCell = openCell(newGameBoard, row, column);

        if(boardAfterOpeningCell){
            setGameBoard(boardAfterOpeningCell);
        }

    }

    return {level, changeLevel, gameBoard, handleCellLeftClick};
}

export default useMinesweeperGame;