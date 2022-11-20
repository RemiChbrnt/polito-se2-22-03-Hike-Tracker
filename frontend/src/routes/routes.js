// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import { AddHikeForm } from "../components/addHikeForm";
import { AddPointForm } from "../components/addPointForm";
import { AddHutForm } from "../components/addHutForm";
import { LinkHutToHike } from "../components/linkHutToHike";
import HikerPersonalPage from "../screens/HikerPersonalPage";
import { Container, Row, Col } from 'react-bootstrap';

import Hiker  from "../screens/hiker.js";
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
        screen: function (props, setProps) {
            return <Hiker setProps={setProps} />
        }
    },
    {
        path: "/hiker/personal-page",
        key: "hiker-personal-page",
        screen: function(props, setProps) {
            return <HikerPersonalPage props={props} setProps={setProps}/>
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
        path: "/add-hike-description",
        key: "add-hike-description",
        screen: function (props, setProps) {
            return <AddHikeForm props={props} setProps={setProps} />
        }
    },
    {
        path: "/add-hut",
        key: "add-hut",
        screen: function (props, setProps) {
            return (
                <Container>
                    <Row >
                        <Col></Col>
                        <Col>
                            <AddHutForm props={props} setProps={setProps} />
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    }, 
    {
        path: "/add-parking-lot",
        key: "add-parking-lot",
        screen: function (props, setProps) {
            return <AddPointForm props={props} setProps={setProps} />
        }
    },
    {
        path: "/add-hike",
        key: "add-hike",
        screen: function (props, setProps) {
            return <AddPointForm props={props} setProps={setProps} />
        }
    },
    {
        path: "/link-hut-to-hike",
        key: "link-hut-to-hike",
        screen: function (props, setProps) {
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