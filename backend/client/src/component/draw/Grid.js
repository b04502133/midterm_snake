import React from 'react';
import Row from './Row'

export default ({ GRID,isGameOver, snake, snack }) => {
    return <div>
      {GRID.map(y => (
        <Row
          GRID={GRID}
          y={y}
          key={y}
          snake={snake}
          snack={snack}
          isGameOver={isGameOver}
        />
      ))}
    </div>
}