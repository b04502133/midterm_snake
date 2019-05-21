import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Snake from './container/Snake';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Snake />, document.getElementById('root'));
registerServiceWorker();
