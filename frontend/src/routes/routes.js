// Route parameters for navigation
import HikeDetail from "../screens/hikeDetail.js";
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import { AddHikeForm } from "../components/addHikeForm";
import { AddParkingForm } from "../components/addParkingForm";
import { AddPointForm } from "../components/addPointForm";
import { AddHutForm } from "../components/addHutForm";
import { LinkHutToHike } from "../components/linkHutToHike";
import HikerPersonalPage from "../screens/HikerPersonalPage";
import { Container, Row, Col } from 'react-bootstrap';
import { UpdateHutStatus } from "../components/updateHutStatus.js";
import { HutListPage } from "../screens/hutListPage";
import Hiker from "../screens/hiker.js";
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
        path: "/hiker/personal-page",
        key: "hiker-personal-page",
        screen: function (props, setProps) {
            return <HikerPersonalPage props={props} setProps={setProps} />
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
        path: "/add-hut",
        key: "add-hut",
        screen: function (user, props, setProps) {
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
        screen: function (user, props, setProps) {
            return (
                <Container>
                    <Row >
                        <Col></Col>
                        <Col>
                            <AddParkingForm props={props} setProps={setProps} />
                        </Col>
                        <Col></Col>
                    </Row>
                    <ul></ul>
                </Container>
            );
        }
    },
    {
        path: "/add-hike",
        key: "add-hike",
        screen: function (user, props, setProps) {
            return <AddPointForm props={props} setProps={setProps} />
        }
    },
    {
        path: "/link-hut-to-hike",
        key: "link-hut-to-hike",
        screen: function (user, props, setProps) {
            return <LinkHutToHike user={user} props={props} setProps={setProps} />
        }
    },
    {
        path: "/hut-list",
        key: "hut-list",
        screen: function (props, setProps) {
            return <HutListPage props={props} setProps={setProps} />
        }
    },
    {
        path: "/update-hut-status",
        key: "update-hut-status",
        screen: function (user, props, setProps) {
            return <UpdateHutStatus user={user} props={props} setProps={setProps} />
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