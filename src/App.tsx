import React, {  } from 'react';
import logo from './logo.svg';
import './App.css';
import {  MantineProvider } from '@mantine/core';
import Home from './pages/home/home';

function App() {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="App">
          <header>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Home />
        </div>
      </MantineProvider>
  );
}
export default App;
