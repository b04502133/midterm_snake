//import React from 'react';
import axios from 'axios';
import React, { Component } from 'react';
import './Snake.css';
import Grid from './draw/Grid'
import { init } from 'events';
import Input from './draw/Input'
import Record from './draw/Record'
import { stat } from 'fs';
import Snake_pic from './snake.jpg'
const TICK_RATE = 100;
const GRID_SIZE = 20;
const GRID = [];

for (let i = 0; i <= GRID_SIZE; i++) {
  GRID.push(i);
}

const DIRECTIONS = {
  UP: 'UP',
  BOTTOM: 'BOTTOM',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
};

const DIRECTION_TICKS = {
  UP: (x, y) => ({ x, y: y - 1 }),
  BOTTOM: (x, y) => ({ x, y: y + 1 }),
  RIGHT: (x, y) => ({ x: x + 1, y }),
  LEFT: (x, y) => ({ x: x - 1, y }),
};

const KEY_CODES_MAPPER = {
  38: 'UP',
  39: 'RIGHT',
  37: 'LEFT',
  40: 'BOTTOM',
};

const getRandomNumberFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomCoordinate = () => ({
  x: getRandomNumberFromRange(1, GRID_SIZE - 1),
  y: getRandomNumberFromRange(1, GRID_SIZE - 1),
});

const isPosition = (x, y, diffX, diffY) => x === diffX && y === diffY;

const isSnake = (x, y, snakeCoordinates) =>
  snakeCoordinates.filter(coordinate =>
    isPosition(coordinate.x, coordinate.y, x, y)
  ).length;

const getSnakeHead = snake => snake.coordinates[0];

const getSnakeWithoutStub = snake =>
  snake.coordinates.slice(0, snake.coordinates.length - 1);

const getSnakeTail = snake => snake.coordinates.slice(1);

const getIsSnakeOutside = snake =>
  getSnakeHead(snake).x >= GRID_SIZE ||
  getSnakeHead(snake).y >= GRID_SIZE ||
  getSnakeHead(snake).x <= 0 ||
  getSnakeHead(snake).y <= 0;

const getIsSnakeClumy = snake =>
  isSnake(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    getSnakeTail(snake)
  );

const getIsSnakeEating = ({ snake, snack }) =>
  isPosition(
    getSnakeHead(snake).x,
    getSnakeHead(snake).y,
    snack.coordinate.x,
    snack.coordinate.y
  );

const reducer = (state, action) => {
  switch (action.type) {
    case 'SNAKE_CHANGE_DIRECTION':
      return {
        ...state,
        playground: {
          ...state.playground,
          direction: action.direction,
        },
      };
    case 'SNAKE_MOVE':
      const isSnakeEating = getIsSnakeEating(state);

      const snakeHead = DIRECTION_TICKS[state.playground.direction](
        getSnakeHead(state.snake).x,
        getSnakeHead(state.snake).y
      );

      const snakeTail = isSnakeEating
        ? state.snake.coordinates
        : getSnakeWithoutStub(state.snake);

      const snackCoordinate = isSnakeEating
        ? getRandomCoordinate()
        : state.snack.coordinate;
      
      const snakescore = isSnakeEating
        ? state.count += 1
        : state.count;
      return {
        ...state,
        snake: {
          coordinates: [snakeHead, ...snakeTail],
        },
        snack: {
          coordinate: snackCoordinate,
        },
        count: snakescore,
      };
    case 'GAME_OVER':
      //onSubmit(state.records)
      //console.log(state.records);
      return {
        ...state,
        playground: {
          ...state.playground,
          isGameOver: true,
        },
        //records: action.payload,
      };
    case 'RESET':
      return {
        ...state,
        playground: {
          direction: DIRECTIONS.RIGHT,
          isGameOver: false,
        },
        snake: {
          coordinates: [getRandomCoordinate()],
        },
        snack: {
          coordinate: getRandomCoordinate(),
        },
        count: 0,
        records: [],
      };
    case 'RecordName':
      console.log(action.payload)
      return {
        ...state,
        name:action.payload,
      }
    case 'SET_RECORD':
      return{
        ...state,
        records:action.payload,
      }
    default:
      throw new Error();
  }
};

const initialState = {
  playground: {
    direction: DIRECTIONS.RIGHT,
    isGameOver: true,
  },
  snake: {
    coordinates: [getRandomCoordinate()],
  },
  snack: {
    coordinate: getRandomCoordinate(),
  },
  count: 0,
  name: "unknown",
  records: [],
};

const Snake = () => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChangeDirection = event => {
    if (KEY_CODES_MAPPER[event.keyCode]) {
      dispatch({
        type: 'SNAKE_CHANGE_DIRECTION',
        direction: KEY_CODES_MAPPER[event.keyCode],
      });
    }
  };
  const onKeyUp = event =>{
    if(event.key === 'Enter' && event.target.value !== ''){
      const name = event.target.value;
      event.target.value = '';
      dispatch({
        type: 'RecordName',
        payload: name,
      })
    }
  }
 
  React.useEffect(() => {
    async function showRecords(){
      const newRecord = {
        name: state.name,
        score: state.count,
      }
      axios.post('http://localhost:4000/records/add', newRecord)
        .then(res => console.log(res.data));
      const result = await axios.get('http://localhost:4000/records/')
        dispatch({
          type: 'SET_RECORD',
          payload: result.data
        })  
    }
    showRecords();
  }, [state.playground.isGameOver]);
  
  React.useEffect(() => {
    window.addEventListener('keyup', onChangeDirection, false);
    return () =>
      window.removeEventListener('keyup', onChangeDirection, false);
  }, [state]);

  React.useEffect(() => {
    const onTick = () => {
      (getIsSnakeOutside(state.snake) || getIsSnakeClumy(state.snake)) || state.playground.isGameOver===true
        ? dispatch({ 
            type: 'GAME_OVER' ,
        })
        : dispatch({ type: 'SNAKE_MOVE' });
    };

    const interval = setInterval(onTick, TICK_RATE);

    return () => clearInterval(interval);
  }, [state]);


  const RecordList = ()=>{
    const Rec = props => (
      <tr>
          <td>{props.snake.name}</td>
          <td>{props.snake.score}</td>
      </tr>
    )
    state.records.sort(function(a,b){
      return b.score - a.score;
    });
    var results = state.records.filter((item, index) => index < 10);
  
    function snakeList () {
        return results.map(function(currentSnake, i){
            return <Rec snake={currentSnake} key={i} />;
        })
      }
    let List = snakeList()
    return List;
  }
  
  return (
    <div className="app">
      <div className="header">
        <div className="use-flexbox">
          <img src={Snake_pic} className="pic"></img>
          <h1>JoJo's Snake!</h1>
        </div>
        <div className="name_score">
          <Record Name={state.name} Score={state.count}></Record>
          <Input onKeyUp={onKeyUp}></Input>
          <button onClick={()=> dispatch({type:'RESET', payload:initialState})}  >Start</button>  
        </div>
        <Grid
          GRID={GRID}
          snake={state.snake}
          snack={state.snack}
          isGameOver={state.playground.isGameOver}
        />
      </div>
      <div className="grid-records">
        <h1>Top 10!!!</h1>
        <table className="table table-striped" style={{ marginTop: 20}} >
            <thead>
                <tr>
                    <th>name</th>
                    <th>score</th>
                </tr>
            </thead>
            <tbody >
                { RecordList() }
            </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default Snake;
