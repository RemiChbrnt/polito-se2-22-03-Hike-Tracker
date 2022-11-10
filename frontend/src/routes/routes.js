// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
import Hiker from "../screens/hiker.js";
import Home from "../screens/home.js";

const routes=[
    {
        path: "/",
        key: "Home",
        screen: function(props, setProps){
            return <Home setProps={setProps}/>
        } 
    },
    {
        path: "/hiker",
        key: "hiker",
        screen: function(props, setProps){
            return <Hiker setProps={setProps}/>
        } 
    },
    {
        path: "/hike-detail-:hikeId",
        key: "hike-detail",
        screen: function(props, setProps){
            return <HikeDetail props={props} setProps={setProps}/>
        } 
    }
    
]

export default routes;