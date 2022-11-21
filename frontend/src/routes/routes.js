// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import { AddHikeForm } from "../components/addHikeForm";
import { AddPointForm } from "../components/addPointForm";
import { LinkHutToHike } from "../components/linkHutToHike";
import Hiker  from "../screens/hiker.js";
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
        screen: function (props, setProps) {
            return <LocalGuide setProps={setProps} />
        }
    },*/
    {
        path: "/hiker",
        key: "hiker",
        screen: function (user, props, setProps) {
            return <Hiker setProps={setProps} />
        }
    },
    {
        path: "/hike-detail-:hikeId",
        key: "hike-detail",
        screen: function (user, props, setProps) {
            return <HikeDetail props={props} setProps={setProps} />
        }
    },
    {
        path: "/add-hike-description",
        key: "add-hike-description",
        screen: function (user, props, setProps) {
            return <AddHikeForm user={user} props={props} setProps={setProps} />
        }
    },
    {
        path: "/add-parking-lot",
        key: "add-parking-lot",
        screen: function (user, props, setProps) {
            return <AddPointForm props={props} setProps={setProps} />
        }
    }, 
    {
        path: "/link-hut-to-hike",
        key: "link-hut-to-hike",
        screen: function (user, props, setProps) {
            return <LinkHutToHike props={props} setProps={setProps} />
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