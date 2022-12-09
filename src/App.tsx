import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, MantineProvider } from '@mantine/core';
import Home from './pages/home/home';

function App() {
  const [grandBtnName, setGrandBtnName] = useState('App')
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="App">
          <header>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Button onClick={() => setGrandBtnName('GRAND点击了')} compact>{grandBtnName}</Button>
          <Home />
        </div>
      </MantineProvider>
  );
}
export default App;
