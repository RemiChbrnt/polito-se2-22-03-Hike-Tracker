import logo from './logo.svg';
import './App.css';

import routes from './routes/routes';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBar } from "./components/navBar";



function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
            {routes.map((route) => {
                return (<Route
                    key={route.key}
                    path={route.path}
                    element={route.screen}
                />);
                })
            }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
