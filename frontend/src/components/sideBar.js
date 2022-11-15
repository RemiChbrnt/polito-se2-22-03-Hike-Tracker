import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Navbar, Dropdown, Offcanvas, NavDropdown, Nav, Form } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'

function SideBar(props) {
    const navigate = useNavigate();

    return (
        <Container>

            <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-xxl"} />
            <Navbar.Offcanvas
                id={"offcanvasNavbar-expand-xxl"}
                aria-labelledby={"offcanvasNavbarLabel-expand-xxl"}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={"offcanvasNavbarLabel-expand-xxl"}>
                        <h2 >Options {props.user.role}</h2>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link onClick={()=>{}}><h5>Add hike description</h5></Nav.Link>
                        <Nav.Link onClick={()=>{}}><h5>Add parking lot</h5></Nav.Link>
                        <Nav.Link onClick={()=>{}}><h5>Link hut to hike</h5></Nav.Link>
                        <ul></ul>
                        <Button onClick={()=>{props.setUser(undefined)}} variant='danger'><i className="bi bi-box-arrow-in-right"></i> Log-Out{" "}</Button>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>

    );
}

export { SideBar };