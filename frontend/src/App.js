import logo from './logo.svg';
import './App.css';

import routes from './routes/routes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/navBar";
import HikeDetail from './screens/hikeDetail';
import API from './API';


function App() {

  const [props, setProps] = useState({
      hikeTitle: "Sentiero per il Rocciamelone",
      hikeDifficulty: "pro", 
      hikeLength: 9,
      hikeExpTime: 6.5,
      hikeAscent: 1352,
      hikeDescription: "A beautiful hike and some more text to see how the display happens. A beautiful hike and some more text to see how the display happens.A beautiful hike and some more text to see how the display happens.A beautiful hike and some more text to see how the display happens.A beautiful hike and some more text to see how the display happens.", 
    
    });
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
