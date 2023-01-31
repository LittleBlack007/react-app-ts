import React, {  } from 'react';
import logo from './logo.svg';
import './App.css';
import {  MantineProvider } from '@mantine/core';
import Home from './pages/home/home';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-center">
          <div className="App">
            <header>
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Home />
          </div>
        </NotificationsProvider>
      </MantineProvider>
  );
}
export default App;
