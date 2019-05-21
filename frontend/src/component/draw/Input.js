import React from 'react';

export default ({onKeyUp}) => {
    return <input type='text'
                //className="todo-app__input" 
                placeholder="your name" 
                onKeyUp = {onKeyUp}>
            </input>
};