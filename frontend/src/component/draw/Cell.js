import React from 'react';
import cs from 'classnames';

const GRID_SIZE = 20;

const isBorder = (x, y) =>
  x === 0 || y === 0 || x === GRID_SIZE || y === GRID_SIZE;

const isSnake = (x, y, snakeCoordinates) =>
    snakeCoordinates.filter(coordinate =>
    isPosition(coordinate.x, coordinate.y, x, y)
    ).length;

const isPosition = (x, y, diffX, diffY) => x === diffX && y === diffY;

const getSnakeHead = snake => snake.coordinates[0];

const getCellCs = (isGameOver, snake, snack, x, y) =>
  cs('grid-cell', {
    'grid-cell-border': isBorder(x, y),
    'grid-cell-snake': isSnake(x, y, snake.coordinates),
    'grid-cell-snack': isPosition(
      x,
      y,
      snack.coordinate.x,
      snack.coordinate.y
    ),
    'grid-cell-hit':
      isGameOver &&
      isPosition(x, y, getSnakeHead(snake).x, getSnakeHead(snake).y),
  });

export default ({ isGameOver, snake, snack, x, y }) =>{
    return <div className={getCellCs(isGameOver, snake, snack, x, y)} ></div>
}