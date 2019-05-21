import React from 'react';

export default ({ Name, Score }) => {
    return <div >
          <p>{"Name: " + Name }</p> 
          <p>{"Score: "+ Score}</p>
          {/* <h1>{Score}</h1> */}
        </div>
}