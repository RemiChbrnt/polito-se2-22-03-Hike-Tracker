import logo from './logo.svg';
import './App.css';

import routes from './routes/routes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/navBar";
import API from './API';


function App() {



    return (
        <div>
            <BrowserRouter>
                <NavBar loggedIn={loggedIn} />
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
