// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import Hiker from "../screens/hiker.js";
import LocalGuide from "../screens/localGuide.js";
import Home from "../screens/home.js";


const routes = [
    /*{
        path: "/",
        key: "Home",
        screen: function (props, setProps) {
            return <Home props={props} setProps={setProps} />
        }
    },
    {
        path: "/localGuide",
        key: "localGuide",
        screen: function(props, setProps){
            return <LocalGuide setProps={setProps}/>
        } 
    },*/
    {
        path: "/hiker",
        key: "hiker",
        screen: function (props, setProps) {
            return <Hiker setProps={setProps} />
        }
    },
    {
        path: "/hike-detail-:hikeId",
        key: "hike-detail",
        screen: function (props, setProps) {
            return <HikeDetail props={props} setProps={setProps} />
        }
    }
]

const userRoutes = [
    {
        path: "/login",
        key: "login",
        screen: function (user, setUser) {
            return <LoginForm user={user} setUser={setUser} />
        }
    },
    {
        path: "/signup",
        key: "signup",
        screen: function (user, setUser) {
            return <SignupForm user={user} setUser={setUser} />
        }
    }
]

export { routes, userRoutes };