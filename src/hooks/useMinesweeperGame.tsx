import { useState } from "react";
import { initGame, revealEmptyCells } from "../utils";
import { TBoard } from "../types";
const useMinesweeperGame = ()=>{

    const [gameBoard, setGameBoard] = useState(initGame(9,9,10));

    const openCell = (board:TBoard, row:number, column:number) => { 
        const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));
        const cell = newGameBoard[row][column];
        const isMineCell = cell.value === 'mine';
        const isNumberCell = typeof cell.value === 'number' && cell.value > 0;
        const isEmptyCell = typeof cell.value === 'number' && cell.value === 0;

        if(isMineCell){
            console.log("mine cell");
        }

        if(!isMineCell){
            cell.isOpened = true;
            if(isNumberCell){
                console.log("number cell");
            }
            if(isEmptyCell){
                revealEmptyCells(newGameBoard, 9, 9, row, column);
                console.log("empty cell");
            }
        }
        return newGameBoard;
        
    }
    
    const handleCellLeftClick = (row:number, column:number) => {
        const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));
        
        const boardAfterOpeningCell = openCell(newGameBoard, row, column);

        if(boardAfterOpeningCell){
            setGameBoard(boardAfterOpeningCell);
        }

    }

    return {gameBoard, handleCellLeftClick};
}

export default useMinesweeperGame;