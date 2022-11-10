// Route parameters for navigation
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import Hiker from "../screens/hiker.js";
import Home from "../screens/home.js";
import { useState } from 'react';

const [loggedIn, setLoggedIn] = useState(false);

const routes = [
    {
        "path": "/",
        "key": "Home",
        "screen": <Home />
    },
    {
        "path": "/hiker",
        "key": "hiker",
        "screen": <Hiker />
    },
    {
        "path": "/login",
        "key": "login",
        "screen": <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    },
    {
        "path": "/signup",
        "key": "signup",
        "screen": <SignupForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    }
]

export default routes;