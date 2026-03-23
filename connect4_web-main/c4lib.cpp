#include "c4lib.h"
#include <iostream>
using namespace std;

int findYValue(BoardValue** board, int ydim, int x);

enum BoardValue playerToValue[2] = {RED, YELLOW};

int findYValue(BoardValue** board, int ydim, int x)
{
  int value = -1;
  for(int i = 0; i < ydim; i++)
  {
    if(board[i][x] == 0)
    {
      value = i;
      break;
    }
  }
  return value;
}

BoardValue** allocateBoard(int ydim, int xdim)
{
  BoardValue** newBoard = new BoardValue*[ydim];
  for(int i = 0; i < ydim; i++)
  {
    newBoard[i] = new BoardValue[xdim];
    for(int j = 0; j < xdim; j++)
    {
      newBoard[i][j] = BLANK;
    }
  }
  return newBoard;
}

void deallocateBoard(BoardValue** board, int ydim)
{
  for(int i = 0; i < ydim; i++)
  {
    delete [] board[i];
  }
  delete [] board;
}

void printBoard(BoardValue** board, int ydim, int xdim)
{
  const char* boardToString[] = { "\U000026ab", "\U0001F534", "\U0001F7E1" };
  for(int y = ydim-1; y >= 0; y--){
    for(int x = 0; x < xdim; x++) {
      cout << boardToString[(int)board[y][x]] << " ";
    }
    cout << endl;
  }
  cout << endl;
}

bool getNextHumanInput(
  BoardValue** board, 
  int ydim, int xdim, 
  int *y, int *x,
  int currentPlayer,
  int xval)
{
  int yval;
  if (xval < 0 || xval >= xdim){
    return true;
  }
  yval = findYValue(board, ydim, xval);
  if (yval == -1){
    return true;
  }

  *y = yval;
  *x = xval;

  board[*y][*x] = playerToValue[currentPlayer];

  return false;
}

bool hasWon(
  BoardValue** board,
  int ydim, int xdim,
  int sy, int sx,
  int currentPlayer)
{
  const int NDIRS = 4;
  const int xDirDelta[NDIRS] = { 0, +1, -1, +1};
  const int yDirDelta[NDIRS] = {+1,  0, +1, +1};

  for(int i = 0; i < NDIRS; i++)
  {
    int count = 1;
    int x = sx;
    int y = sy;
    y += yDirDelta[i];
    x += xDirDelta[i];

    while(count < 4)
    {
      if(y < ydim && x < xdim && y >= 0 && x >= 0)
      {
        if(board[y][x] == board[sy][sx])
        {
          count++;
          y += yDirDelta[i];
          x += xDirDelta[i];
        }
        else 
        {
          break;
        }
      }
      else
      {
        break;
      }
    }

    y = sy; 
    x = sx;
    y -= yDirDelta[i];
    x -= xDirDelta[i];

    while(count < 4)
    {
      if(y < ydim && x < xdim && y >= 0 && x >= 0)
      {
        if(board[y][x] == board[sy][sx])
        {
          count++;
          y -= yDirDelta[i]; 
          x -= xDirDelta[i];
        }
        else 
        {
          break;
        }
      }
      else
      {
        break;
      } 
    }

    if(count == 4)
    {
      return true;
    }
  }
  return false;
}

bool isDraw(
  BoardValue** board,
  int ydim, int xdim)
{
  for(int i = 0; i < xdim; i++)
  {
    if(board[ydim - 1][i] == BLANK)
    {
      return false;
    }
  }
  return true;
}

bool getUserAIInput(
  BoardValue** board, 
  int ydim, int xdim, 
  int *y, int *x,
  int currentPlayer)
{
  for(int i = 0; i < xdim; i++)
  {
    int row = findYValue(board, ydim, i);
    if(row != -1)
    {
      board[row][i] = playerToValue[currentPlayer];
      if(hasWon(board, ydim, xdim, row, i, currentPlayer))
      {
        *y = row;
        *x = i;
        return false;
      }
      board[row][i] = BLANK;
    }
  }

  for(int i = 0; i < xdim; i++)
  {
    int row = findYValue(board, ydim, i);
    if(row != -1)
    {
      board[row][i] = playerToValue[1 - currentPlayer];
      if(hasWon(board, ydim, xdim, row, i, 1 - currentPlayer))
      {
        board[row][i] = playerToValue[currentPlayer];
        *y = row;
        *x = i;
        return false;
      }
      board[row][i] = BLANK;
    }
  }

  return getRandomAIInput(board, ydim, xdim, y, x, currentPlayer);
}

bool getRandomAIInput(
  BoardValue** board, 
  int ydim, int xdim, 
  int *y, int *x,
  int currentPlayer)
{
  for(int i = 0; i < xdim; i++)
  {
    int row = findYValue(board, ydim, i);
    if(row != -1)
    {
      board[row][i] = playerToValue[currentPlayer];
      *y = row;
      *x = i;
      return false;
    }
  }
  return true;
}
