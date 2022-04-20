import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CookerApp from './components/cooker-app/cookerApp';
import reportWebVitals from './reportWebVitals';

const { worker } = require('./mocks/browser')
worker.start()

ReactDOM.render(
  <React.StrictMode>
    <CookerApp/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
