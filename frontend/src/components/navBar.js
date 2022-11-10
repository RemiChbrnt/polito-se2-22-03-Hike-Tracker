import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'

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
                        <div>
                            {!props.loggedIn && <Row>
                                <Col>
                                    <Button onClick={() => { navigate('/login') }} variant='success'><i className="bi bi-box-arrow-in-right"></i> Log-In {" "}</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => { navigate('/signup') }} variant='success'><i className="bi bi-box-arrow-in-right"></i> Sign-Up{" "}</Button>
                                </Col>
                            </Row>}
                        </div>
                    </Container>
                </Navbar>
            </Row>
            <ul></ul>
        </Container>
    );
}

export { NavBar };