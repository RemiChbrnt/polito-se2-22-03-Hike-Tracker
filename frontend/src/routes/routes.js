// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import Hiker from "../screens/hiker.js";
import LocalGuide from "../screens/localGuide.js";
import Home from "../screens/home.js";


const routes = [
    {
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
    },
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
    },
    {
        path: "/login",
        key: "login",
        screen: function (props, setProps) {
            return <LoginForm props={props} setProps={setProps} />
        }
    },
    {
        path: "/signup",
        key: "signup",
        screen: function (props, setProps) {
            return <SignupForm props={props} setProps={setProps} />
        }
    }

]

export default routes;