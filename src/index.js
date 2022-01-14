import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import 'jquery/dist/jquery';
import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/js/bootstrap.min';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
