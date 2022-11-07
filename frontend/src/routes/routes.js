// Route parameters for navigation
import Hiker from "../screens/hiker.js";
import Home from "../screens/home.js";

const routes=[
    {
        "path": "/",
        "key": "Home",
        "screen": <Home/> 
    },
    {
        "path": "/hiker",
        "key": "hiker",
        "screen": <Hiker/> 
    }
]

export default routes;