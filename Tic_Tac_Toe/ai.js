// Here are the tools to use to build your AI:

// The aiSelect() function is called by the game when it is the AI's turn to make a move.
// This function should return which square to play to, 0-8.
function aiSelect() {
  print( getAvailableCells());
  return random(getAvailableCells());
}
