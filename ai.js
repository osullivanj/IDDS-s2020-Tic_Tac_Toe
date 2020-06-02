/* globals board gridSize emptyCells board2d compareArrays report getRows getColumns */

/* ai.js
 *
 * Tic Tac Toe Game Player File (an Artificial Intelligence program)
 *
 * by 👉enter yourself here, with email 👈
 *
 *           INSTRUCTIONS
 *
 * - Write your AI in this file.
 * - You may create new functions, variables, and anything else your AI needs in this file.
 * - Don't edit the sketch.js file. You can look, but don't touch.
 * - The AI takes one turn at a time.
 * - The AI is invoked when the game calls the aiSelect() function.
 * - The aiSelect() function returns the number of which cell to mark, 0-8:
 *
 *     0 | 1 | 2
 *    -----------
 *     3 | 4 | 5
 *    -----------
 *     6 | 7 | 8
 *
 * - The AI may NOT edit the game state in any way.
 * - The AI MUST return 0-8 from aiSelect (as long the game hasn't ended yet, after which we don't care)
 * - The AI may look at the game state variables: board, gridSize, etc, but not change them.
 *
 * - The game is 2-dimensional, but the board is stored a 1-dimensional array, using the cell numbers above.
 * - If you want to think about the board as 2D, we provided a function board2d() to provide a 2d interface to it.
 * - Each cell of the board is either 'X', 'O', or '', where empty string means the cell is empty.
 *
 *        RESOURCES
 * board        ➡️ variable containing the board state array. Readable like this: board[5]
 * gridSize     ➡️ variable describing the width (and heigh) of the board. Default is 3.
 * player       ➡️ variable containing the mark of the current player (that's you!)
 *
 * board2d()    ➡️ function to read the board while thinking 2D, like this: board(2,3) <- reads value row 2, column 3
 * cell2d()     ➡️ function that converts coordinates (row, col) into a 1D cell number.
 *
 * getRows()    ➡️ function that slices the game stateinto rows. Returns an array of the rows. Each row is an array.
 * getColumns() ➡️ function that slices the game state into columns. Returns an array of cols, each is an array.
 *
 * emptyCells() ➡️ function to give you what cells are empty in a given board state (or array). emptyCells(board)
 */

function aiSelect() {
  return random(emptyCells(board));
}
