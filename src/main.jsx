import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './Context/AuthContextProvider.jsx';
import { ChakraProvider } from '@chakra-ui/react';



ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthContextProvider>
  <BrowserRouter>
  <ChakraProvider>
   
    <App />
  
      </ChakraProvider>
 </BrowserRouter>
 </AuthContextProvider>
 
);
