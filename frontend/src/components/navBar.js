import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Navbar, Dropdown } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SideBar } from "./sideBar";
import Logo from '../images/Logo.png';

function NavBar(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Container fluid>
            <Row>
                <Navbar expand="lg" style={{ backgroundColor: "#00706c" }} variant="dark">
                    <Container fluid>

                        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => { navigate('/') }}>
                            <img src={Logo} style={{height: 100}} alt="logo"/>
                        </Navbar.Brand>


                        {props.user === undefined ?
                            location.pathname === "/login" ?
                                false
                                :
                                <Row>
                                    <Col>
                                        <h1 onClick={() => { navigate('/login') }} ><i className="bi bi-person-circle text-white" style={{ cursor: "pointer" }}></i>{" "}</h1>
                                    </Col>
                                </Row>
                            :
                            <Row>
                                <Col>
                                    <SideBar user={props.user} setUser={props.setUser} />
                                </Col>
                            </Row>
                        }


                    </Container>
                </Navbar>
            </Row>
            <ul></ul>
        </Container>
    );
}

export { NavBar };