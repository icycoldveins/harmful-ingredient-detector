import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';  // Ensure ChakraProvider is imported
import GlobalStyle from './Globastyles' // Ensure the correct import path
import './index.css';  // Make sure the path is correct based on your project structure

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create the root using createRoot

root.render(
  <ChakraProvider>

    <GlobalStyle /> {/* Apply your global styles */}
    <App />
    </ChakraProvider>
);
