import logo from './logo.svg';
import './App.css';

import routes from './routes/routes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/navBar";
import HikeDetail from './screens/hikeDetail';
import API from './API';


function App() {

  const [props, setProps] = useState(null);
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
            {routes.map((route) => {
                return (<Route
                    key={route.key}
                    path={route.path}
                    element={route.screen(props, setProps)}
                />);
                })
            }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
