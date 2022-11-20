import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Navbar, Dropdown, Offcanvas, NavDropdown, Nav, Form } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'

function SideBar(props) {
    const navigate = useNavigate();
    console.log("role ", props.user.role )

    return (
        <Container>
            <Nav >
                <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-xxl"} />
                <Navbar.Offcanvas style={{ backgroundColor: "#00706c" }}
                    id={"offcanvasNavbar-expand-xxl"}
                    aria-labelledby={"offcanvasNavbarLabel-expand-xxl"}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={"offcanvasNavbarLabel-expand-xxl"}>
                            <h2 style={{ color: "white" }}>Options {props.user.role}</h2>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    {
                        props.user.role === "guide" ?
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link onClick={() => { navigate('/add-hike-description') }} style={{ color: "white" }} active><h5>Add hike description</h5></Nav.Link>
                                    <Nav.Link onClick={() => { navigate('/add-parking-lot') }} style={{ color: "white" }}><h5>Add parking lot</h5></Nav.Link>
                                    <Nav.Link onClick={() => { navigate('/add-hut') }} style={{ color: "white" }}><h5>Add hut</h5></Nav.Link>
                                    <Nav.Link onClick={() => { navigate('/add-hike-description') }} style={{ color: "white" }}><h5>Link hut to hike</h5></Nav.Link>
                                    <ul></ul>
                                    <Button onClick={() => { props.setUser(undefined) }} variant='danger'><i className="bi bi-box-arrow-in-right"></i> Log-Out{" "}</Button>
                                </Nav>
                            </Offcanvas.Body>
                            :
                            props.user.role === "hutworker" ?
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        {/*ADD OPTIONS FOR HUTWORKER TO DO*/}
                                        <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR HUTWORKER</h5></Nav.Link>
                                        <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR HUTWORKER</h5></Nav.Link>
                                        <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR HUTWORKER</h5></Nav.Link>
                                        <ul></ul>
                                        <Button onClick={() => { props.setUser(undefined) }} variant='danger'><i className="bi bi-box-arrow-in-right"></i> Log-Out{" "}</Button>
                                    </Nav>
                                </Offcanvas.Body>
                                :
                                props.user.role === "emergency" ?
                                    <Offcanvas.Body>
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            {/*ADD OPTIONS EMERGENCY TO DO*/}
                                            <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR EMERGENCY</h5></Nav.Link>
                                            <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR EMERGENCY</h5></Nav.Link>
                                            <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR EMERGENCY</h5></Nav.Link>
                                            <ul></ul>
                                            <Button onClick={() => { props.setUser(undefined) }} variant='danger'><i className="bi bi-box-arrow-in-right"></i> Log-Out{" "}</Button>
                                        </Nav>
                                    </Offcanvas.Body>
                                    : props.user.role === "manager" ?
                                        <Offcanvas.Body>
                                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                                {/*ADD OPTIONS EMERGENCY TO DO*/}
                                                <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR MANAGER</h5></Nav.Link>
                                                <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR MANAGER</h5></Nav.Link>
                                                <Nav.Link onClick={() => { }} style={{ color: "white" }}><h5>OPTIONS FOR MANAGER</h5></Nav.Link>
                                                <ul></ul>
                                                <Button onClick={() => { props.setUser(undefined) }} variant='danger'><i className="bi bi-box-arrow-in-right"></i> Log-Out{" "}</Button>
                                            </Nav>
                                        </Offcanvas.Body>
                                        : props.user.role === "hiker" ?
                                            <Offcanvas.Body> {/*HIKER*/}
                                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                                    <Button onClick={() => { props.setUser(undefined) }} variant='danger'><i className="bi bi-box-arrow-in-right"></i> Log-Out{" "}</Button>
                                                </Nav>
                                            </Offcanvas.Body>
                                            : false
                    }

                </Navbar.Offcanvas>
            </Nav>
        </Container>

    );
}

export { SideBar };