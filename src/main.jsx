import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './Globastyles'; // Import your custom global styles

const rootElement = document.getElementById('root');

ReactDOM.render(
  <>
    <GlobalStyle /> {/* Apply your global styles */}
    <App />
  </>,
  rootElement
);
