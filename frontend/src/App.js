import logo from './logo.svg';
import './App.css';

import { routes, userRoutes } from './routes/routes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/navBar";
import { HikeFilterForm } from './components/hikeFilterForm';
import { HikeDetail } from './screens/hikeDetail';
import Home from "./screens/home.js";
import API from './API';



function App() {

    const [user, setUser] = useState();
    const [props, setProps] = useState([]);


    return (
        <div>
            <BrowserRouter>
                <NavBar user={user} setUser={setUser}/>
                <Routes>
                    <Route path='/' element={<Home user={user} setProps={setProps} />} />
                    {/*<Route path='/hike-filter-form' element={<HikeFilterForm/>}/>*/}
                    {routes.map((route) => {
                        return (<Route
                            key={route.key}
                            path={route.path}
                            element={route.screen(props, setProps)}
                        />);
                    })
                    }
                    {userRoutes.map((route) => {
                        return (<Route
                            key={route.key}
                            path={route.path}
                            element={route.screen(user, setUser)}
                        />);
                    })
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
