import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Unity_build from './Unity/Unity';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Unity_build />
  </React.StrictMode>
);