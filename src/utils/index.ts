import { directions } from "../constants";
import { TBoard, GameCell } from "../types";

const createBoard = (rows:number, columns:number)=>{
    const board:TBoard = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for (let cellIndex = 0; cellIndex < columns; cellIndex++) {
            board[i][cellIndex] = {
              value: null,
              isFlagged: false,
              isOpened: false,
            };
          }
        }
      
        return board;
}

const fillBoardWithMines = (board:TBoard, rows:number, columns:number, totalMines:number)=>{
    let mines = 0;

    while(mines < totalMines){
        const row = Math.floor(Math.floor(Math.random() * rows));
        const column = Math.floor(Math.floor(Math.random() * columns));

        if(board[row][column].value !== "mine"){
            (board[row][column] as GameCell).value = "mine";
            mines++;
        }
    }
    return board;
}

const fillBoardWithNumbers = (board:TBoard)=>{
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell.value !== "mine") {
            let minesAround = 0;
    
            directions.forEach(([dRow, dCol]) => {
              const newRow = rowIndex + dRow;
              const newCol = colIndex + dCol;
    
              if (newRow in board && newCol in board[newRow]) {
                if (board[newRow][newCol].value === "mine") {
                  minesAround++;
                }
              }
            });
    
            cell.value = minesAround;
          }
        });
      });
    
      return board;
    };

export const initBoard = (rows:number, columns:number, totalMines:number)=>{
    const emptyBoard = createBoard( rows, columns);
    const boardWithMines = fillBoardWithMines(emptyBoard, rows, columns, totalMines);
    const gameBoard = fillBoardWithNumbers(boardWithMines);

    return gameBoard;
}

export const initGame = (rows:number, columns:number, totalMines:number)=>{
    return initBoard(rows, columns, totalMines);
}