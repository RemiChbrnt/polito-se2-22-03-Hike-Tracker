import logo from './logo.svg';
import './App.css';

import routes from './routes/routes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/navBar";
import HikeDetail from './screens/hikeDetail';
import Home from "./screens/home.js";
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

  const [hikes, setHikes] = useState([]); /* State thst contains the hikes list */

  useEffect(() => {
    API.getAllHikes().then((hikes) => {
      setHikes(hikes);
      console.log(hikes);
    });

  }, []);


  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home hikes={hikes}/>}
          />
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
