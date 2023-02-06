import React, {  } from 'react';
import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {  MantineProvider } from '@mantine/core';
import Aside from './pages/layouts/aside';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-center">
          <div className="App">
            <section className='app-setion'>
              <div className='app-aside-seat'></div>
              <Aside />
              <div className='app-container-ppp'>
                <header className='ppp-header-seat'></header>
                <header className='ppp-hearder-real'>
                  <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className='ppp-scroll-container eee'>
                  <main className='ppp-main'>
                    <Outlet />
                  </main>
                  <footer className='ppp-footer'>&copy;PPP</footer>
                </div>
                
              </div>
            </section>
          </div>
        </NotificationsProvider>
      </MantineProvider>
  );
}
export default App;
