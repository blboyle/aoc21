export class Bingo {
  constructor(input) {
    this.numbersToCall = this.generateNumbersToCall(input);
    this.boards = this.generateBoards(input);
  }

  private numbersToCall;
  private boards;

  winner;
  currentNumber;
  letThemWin;
  callNextNumber = true;

  winningBoards = [];

  playGame({ letThemWin = false }) {
    this.letThemWin = letThemWin;
    while (
      this.numbersToCall.length > 0 &&
      this.callNextNumber
    ) {
      this.playTurn();
    }
  }

  private generateNumbersToCall(input) {
    const [numbers] = input.split('\n');
    return numbers.split(',');
  }
  private generateBoards(input) {
    const [, ...inputBoards] = input.split('\n\n');
    const soloBoards = inputBoards.map((board) =>
      board
        .split('\n')
        .map((row) =>
          row.split(' ').filter((cell) => cell != ''),
        ),
    );
    return soloBoards.map((board) => [
      board,
      [0, 1, 2, 3, 5].map(() => [0, 0, 0, 0, 0]),
    ]);
  }

  private playTurn() {
    this.currentNumber = this.numbersToCall.shift();
    this.boards.map((board) => {
      const location = this.checkBoardForNumber(
        this.currentNumber,
        board[0],
      );
      if (location != null) {
        const [x, y] = location;
        board[1][x][y] = 1;
      }
    });

    this.boards.map((board, i) => {
      const boardHasWon = this.winningBoards.some(
        (board) => {
          return board[0] == i;
        },
      );
      const keepChecking = this.letThemWin
        ? !boardHasWon
        : !this.winner;

      if (keepChecking) {
        const winner = this.checkBoardForWinner(
          i,
          board[1],
        );
        if (winner) {
          this.winningBoards.push(winner);
        }
      }
    });

    this.callNextNumber = this.letThemWin
      ? this.winningBoards.length < this.boards.length
      : this.winningBoards.length <= 0;
  }

  calculateScore() {
    const winningBoardsLength = this.winningBoards.length;

    const boardIndex =
      this.winningBoards[winningBoardsLength - 1][0];
    const unmarkedItemTotal = this.boards[
      boardIndex
    ][0].reduce(
      (rowAcc, row, i) =>
        rowAcc +
        row.reduce((cellAcc, cell, j) => {
          if (this.boards[boardIndex][1][i][j] === 0) {
            return Number(cellAcc) + Number(cell);
          }
          return cellAcc;
        }, 0),
      0,
    );

    return unmarkedItemTotal * this.currentNumber;
  }

  get score() {
    return this.calculateScore();
  }

  findWinningRowNumbers() {
    const [boardIndex, , row] = this.winner;
    return this.boards[boardIndex][0][row];
  }

  checkBoardForWinner(boardIndex, board) {
    const winningRow = board
      .map((row) => row.every((cell) => cell === 1))
      .indexOf(true);

    if (winningRow > -1) {
      return [boardIndex, 'row', winningRow];
    }

    const reverseArray = [0, 1, 2, 3, 4].map((number) =>
      board.map((row) => row[number]),
    );
    const winningColumn = reverseArray
      .map((row) => row.every((cell) => cell === 1))
      .indexOf(true);

    if (winningColumn > -1) {
      return [boardIndex, 'column', winningColumn];
    }
  }

  checkBoardForNumber(currentNumber, board) {
    let location = [null, null];

    board.map((row, i) => {
      row.map((cell, j) => {
        if (cell == currentNumber) {
          location[0] = i;
          location[1] = j;
        }
      });
    });

    if (location.some((item) => item !== null)) {
      return location;
    } else {
      return null;
    }
  }
}
