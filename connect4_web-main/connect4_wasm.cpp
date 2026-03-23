// connect4_wasm.cpp — WASM-ready wrapper for Connect 4

#include "c4lib.h"
#include <emscripten.h>

extern "C" {

// Board globals — store as static for WASM session
static BoardValue** board = nullptr;
static int ydim = 6;
static int xdim = 7;

EMSCRIPTEN_KEEPALIVE
void initBoard(int y, int x) {
    ydim = y;
    xdim = x;
    if (board) deallocateBoard(board, ydim);
    board = allocateBoard(ydim, xdim);
}

EMSCRIPTEN_KEEPALIVE
void resetBoard() {
    if (!board) return;
    for (int i = 0; i < ydim; i++) {
        for (int j = 0; j < xdim; j++) {
            board[i][j] = BLANK;
        }
    }
}

EMSCRIPTEN_KEEPALIVE
int makeMove(int column, int player) {
    int y, x;
    bool error = getNextHumanInput(board, ydim, xdim, &y, &x, player, column);
    return error ? -1 : y;
}

EMSCRIPTEN_KEEPALIVE
int makeAIMove(int player) {
    int y, x;
    bool error = getUserAIInput(board, ydim, xdim, &y, &x, player);
    return error ? -1 : y; // Return row index or -1 on error
}

EMSCRIPTEN_KEEPALIVE
int makeAIMoveWithPos(int player) {
    int y, x;
    bool error = getUserAIInput(board, ydim, xdim, &y, &x, player);
    if (error) return -1;
    return (y << 8) | x;
}

EMSCRIPTEN_KEEPALIVE
int checkWin(int y, int x, int player) {
    return hasWon(board, ydim, xdim, y, x, player) ? 1 : 0;
}

EMSCRIPTEN_KEEPALIVE
int checkDraw() {
    return isDraw(board, ydim, xdim) ? 1 : 0;
}

EMSCRIPTEN_KEEPALIVE
int getCell(int y, int x) {
    return (int)board[y][x];
}

EMSCRIPTEN_KEEPALIVE
void cleanup() {
    if (board) {
        deallocateBoard(board, ydim);
        board = nullptr;
    }
}

} // extern "C"
