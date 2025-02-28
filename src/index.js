import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CookerApp from './components/cooker-app/cookerApp';
import reportWebVitals from './reportWebVitals';

//Inicar mocks
//const { worker } = require('./mocks/browser')
//worker.start()

const container = document.getElementById('root');
const root = createRoot(container);
root.render(  
<React.StrictMode>
  <CookerApp/>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
