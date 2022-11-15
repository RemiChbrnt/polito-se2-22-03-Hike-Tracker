import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Navbar, Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { SideBar } from "./sideBar";

function NavBar(props) {
    const navigate = useNavigate();
    
    return (
        <Container fluid>
            <Row>
                <Navbar expand="lg" style={{ backgroundColor: "#00706c" }} variant="dark">
                    <Container fluid>


                        <Navbar.Brand href="/">
                            <h1><i className="bi bi-compass"></i>{" "}Hike Tracker</h1>
                        </Navbar.Brand>


                        {props.user === undefined ?
                            <Row>
                                <Col>
                                <Button onClick={() => { navigate('/login') }} style={{ backgroundColor: "#00706c" }} variant="none"><h1><i className="bi bi-person-circle text-white"></i></h1></Button>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col>
                                    <SideBar user={props.user} setUser={props.setUser}/>
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