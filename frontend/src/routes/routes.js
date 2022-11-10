// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
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
    },
    {
        "path": "/hike-detail-:hikeId",
        "key": "hike-detail",
        "screen": <HikeDetail/> 
    }
    
]

export default routes;