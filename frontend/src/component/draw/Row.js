import React from 'react';
import Cell from './Cell'

export default ({ GRID, isGameOver, snake, snack, y }) => {
    return <div className="grid-row">
          {GRID.map(x => (
            <Cell
              x={x}
              y={y}
              key={x}
              snake={snake}
              snack={snack}
              isGameOver={isGameOver}
            />
          ))}
        </div>
}