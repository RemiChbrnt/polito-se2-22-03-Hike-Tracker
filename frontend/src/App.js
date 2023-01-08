import './App.css';

import { routes, userRoutes } from './routes/routes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/navBar";
import { HikeFilterForm } from './components/hikeFilterForm';
import { HikeDetail } from './screens/hikeDetail';
import Home from "./screens/home.js";
import HomeWorker from "./screens/homeWorker.js"
import API from './API';



function App() {

    const [user, setUser] = useState();
    const [props, setProps] = useState([]);

    useEffect(() => {
        API.getUserInfo().then((user)=>{
            setUser(user);
        }).catch((err)=>{
            console.log(err);
            setUser(undefined);
        })
        /*const checkAuth = async () => {
            try {
                const user = await API.getUserInfo();
                setUser(user);
            }
            catch(err) {
                console.log(err);
            }
        }
        checkAuth();*/
    }, [])


    return (
        <div>
            <BrowserRouter>
                <NavBar user={user} setUser={setUser} />
                <Routes>
                {(user === undefined)? <Route path='/' element={<Home user={user} setProps={setProps} />}/> : 
                    user.role!=='hutworker'? <Route path='/' element={<Home user={user} setProps={setProps} />}/>
                    :<Route path='/' element={<HomeWorker user={user} setProps={setProps} />}/>}
                    {/* <Route path='/' element={<HomeWorker user={user} setProps={setProps} />}/> */}
                    {routes.map((route) => {
                        return (<Route
                            key={route.key}
                            path={route.path}
                            element={route.screen(user, props, setProps)}
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
