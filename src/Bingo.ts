type OriginalBoard = number[][];
type BooleanBoard = (0 | 1)[][];

type Location = [number, number];

type Board = [OriginalBoard, BooleanBoard];
type BingoDirection = 'row' | 'column';
type Winner = [number, BingoDirection, number];

export class Bingo {
  constructor(input: string) {
    this.numbersToCall = this.generateNumbersToCall(input);
    this.boards = this.generateBoards(input);
  }

  private numbersToCall: number[];
  private boards: Board[];

  private winner: Winner;
  private currentNumber: number;
  private letThemWin: boolean;
  private callNextNumber: boolean = true;

  private winningBoards: Winner[] = [];

  playGame({
    letThemWin = false,
  }: {
    letThemWin?: boolean;
  }): void {
    this.letThemWin = letThemWin;
    while (
      this.numbersToCall.length > 0 &&
      this.callNextNumber
    ) {
      this.playTurn();
    }
  }

  private generateNumbersToCall(input: string): number[] {
    const [numbers] = input.split('\n');
    return numbers.split(',').map((cell) => Number(cell));
  }

  private generateBoards(input: string): Board[] {
    const [, ...inputBoards] = input.split('\n\n');
    const soloBoards: OriginalBoard[] = inputBoards.map(
      (board) =>
        board.split('\n').map((row) =>
          row
            .split(' ')
            .filter((cell) => cell != '')
            .map((cell) => Number(cell)),
        ),
    );
    return soloBoards.map((board: OriginalBoard) => [
      board,
      [0, 1, 2, 3, 5].map(() => [0, 0, 0, 0, 0]),
    ]);
  }

  private playTurn(): void {
    this.currentNumber = this.numbersToCall.shift();
    this.boards.map(
      ([boardWithNumbers, boardWithBooleans]) => {
        const location: Location | null =
          this.checkBoardForNumber(
            this.currentNumber,
            boardWithNumbers,
          );
        if (location !== null) {
          const [x, y]: Location = location;
          boardWithBooleans[x][y] = 1;
        }
      },
    );

    this.boards.map(([_, boardWithBooleans], i) => {
      const boardHasWon: boolean = this.winningBoards.some(
        ([boardIndex]) => {
          return boardIndex == i;
        },
      );
      const keepChecking: boolean = this.letThemWin
        ? !boardHasWon
        : !this.winner;

      if (keepChecking) {
        const winner: Winner | undefined =
          this.checkBoardForWinner(i, boardWithBooleans);
        if (winner) {
          this.winningBoards.push(winner);
        }
      }
    });

    this.callNextNumber = this.letThemWin
      ? this.winningBoards.length < this.boards.length
      : this.winningBoards.length <= 0;
  }

  calculateScore(): number {
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
    const [boardIndex, _, row] = this.winner;
    return this.boards[boardIndex][0][row];
  }

  private checkBoardForWinner(
    boardIndex: number,
    board: OriginalBoard,
  ) {
    const winningRow: number = board
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

  private checkBoardForNumber(
    currentNumber: number,
    board: OriginalBoard,
  ) {
    let location: Location = [-1, -1];

    board.map((row, i) => {
      row.map((cell, j) => {
        if (cell == currentNumber) {
          location[0] = i;
          location[1] = j;
        }
      });
    });

    if (location.some((item) => item !== -1)) {
      return location;
    } else {
      return null;
    }
  }
}
