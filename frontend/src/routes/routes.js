// Route parameters for navigation

import HikeDetail from "../screens/hikeDetail.js";
import { LoginForm } from "../components/LoginForm.js";
import { SignupForm } from "../components/SignupForm.js";
import { AddHikeForm } from "../components/addHikeForm";
import { AddParkingForm } from "../components/addParkingForm";
import { HutDetail } from "../screens/hutDetail.js";
import { AddHutForm } from "../components/addHutForm";
import { AddHutPhotoForm } from "../components/addHutPhotoForm";
import { LinkHutToHike } from "../components/linkHutToHike";
import HikerPersonalPage from "../screens/HikerPersonalPage";
import { Container, Row, Col } from 'react-bootstrap';
import { UpdateHutStatus } from "../components/updateHutStatus.js";
import RequestsPage from '../components/RequestsPage';
import {CompletedHikes} from '../components/completedHikes'
import { HutListPage } from "../screens/hutListPage";
import {AddHikeCoverForm} from "../components/addHikeCoverForm.js"
import Hiker from "../screens/hiker.js";


const routes = [
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
            return <HikeDetail user={user} props={props} setProps={setProps} />
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
        path: "/hut-detail-:hutId",
        key: "hut-detail",
        screen: function (user, props, setProps) {
            return <HutDetail user={user} props={props} setProps={setProps} />
        }
    },
    {
        path: "/add-hut",
        key: "add-hut",
        screen: function (user, props, setProps) {
            return (<AddHutForm props={props} setProps={setProps} />);
        }
    },
    {
        path: "/add-hut-photo",
        key: "add-hut-photo",
        screen: function (user, props, setProps) {
            return (
                <Container>
                    <Row >
                        <Col></Col>
                        <Col>
                            <AddHutPhotoForm user={user} props={props} setProps={setProps} />
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    },
    {

        path: "/add-hike-cover-:hikeId",
        key: "add-hike-cover",
        screen: function (user, props, setProps) {
            return (
                <Container>
                    <Row >
                        <Col></Col>
                        <Col>
                            <AddHikeCoverForm user={user} props={props} setProps={setProps} />
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
            return (<AddParkingForm props={props} setProps={setProps} />);
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
    },
    {
        path: "/completed-hikes",
        key: "completed-hikes",
        screen: function (user, props, setProps) {
            return <CompletedHikes user={user} props={props} setProps={setProps} />
        }
    },
    {
        path: "/pending-requests",
        key: "pending-requests",
        screen: function (props, setProps) {
            return <RequestsPage props={props} setProps={setProps} />
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