// Route parameters for navigation
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import Hiker from "../screens/hiker.js";
import Home from "../screens/home.js";

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
        "screen": <LoginForm />
    },
    {
        "path": "/signup",
        "key": "signup",
        "screen": <SignupForm />
    }
]

export default routes;