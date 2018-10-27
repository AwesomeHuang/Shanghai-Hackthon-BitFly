import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import nervos from './nervos'

window.nervos = nervos
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
