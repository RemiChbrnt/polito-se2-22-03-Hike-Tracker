import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Button, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function SideBar(props) {

    const location = useLocation();

    const [over, setOver] = useState("");
    const navigate = useNavigate();

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
                                    {(location.pathname === '/' || over === 'hike-list') ?
                                        <Nav.Link onClick={() => { navigate('/') }} onMouseOver={() => { setOver('hike-list') }} onMouseLeave={() => { setOver('') }} style={{ color: "black", backgroundColor: "white" }}><h5>{' '}Hike list</h5></Nav.Link>
                                        :
                                        <Nav.Link onClick={() => { navigate('/') }} onMouseOver={() => { setOver('hike-list') }} onMouseLeave={() => { setOver('') }} style={{ color: "white", backgroundColor: "#00706c" }}><h5>{' '}Hike list</h5></Nav.Link>
                                    }
                                    {(location.pathname === '/add-hike-description' || over === 'add-hike-description') ?
                                        <Nav.Link onClick={() => { navigate('/add-hike-description') }} onMouseOver={() => { setOver('add-hike-description') }} onMouseLeave={() => { setOver('') }} style={{ color: "black", backgroundColor: "white" }}><h5>{' '}Add hike description</h5></Nav.Link>
                                        :
                                        <Nav.Link onClick={() => { navigate('/add-hike-description') }} onMouseOver={() => { setOver('add-hike-description') }} onMouseLeave={() => { setOver('') }} style={{ color: "white", backgroundColor: "#00706c" }}><h5>{' '}Add hike description</h5></Nav.Link>
                                    }
                                    {(location.pathname === '/add-parking-lot' || over === 'add-parking-lot') ?
                                        <Nav.Link onClick={() => { navigate('/add-parking-lot') }} onMouseOver={() => { setOver('add-parking-lot') }} onMouseLeave={() => { setOver('') }} style={{ color: "black", backgroundColor: "white" }}><h5>{' '}Add parking lot</h5></Nav.Link>
                                        :
                                        <Nav.Link onClick={() => { navigate('/add-parking-lot') }} onMouseOver={() => { setOver('add-parking-lot') }} onMouseLeave={() => { setOver('') }} style={{ color: "white", backgroundColor: "#00706c" }}><h5>{' '}Add parking lot</h5></Nav.Link>
                                    }
                                    {(location.pathname === '/link-hut-to-hike' || over === 'link-hut-to-hike') ?
                                        <Nav.Link onClick={() => { navigate('/link-hut-to-hike') }} onMouseOver={() => { setOver('link-hut-to-hike') }} onMouseLeave={() => { setOver('') }} style={{ color: "black", backgroundColor: "white" }}><h5>{' '}Link hut to hike</h5></Nav.Link>
                                        :
                                        <Nav.Link onClick={() => { navigate('/link-hut-to-hike') }} onMouseOver={() => { setOver('link-hut-to-hike') }} onMouseLeave={() => { setOver('') }} style={{ color: "white", backgroundColor: "#00706c" }}><h5>{' '}Link hut to hike</h5></Nav.Link>
                                    }
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
                                                    {(location.pathname === '/' || over === 'hike-list') ?
                                                        <Nav.Link onClick={() => { navigate('/') }} onMouseOver={() => { setOver('hike-list') }} onMouseLeave={() => { setOver('') }} style={{ color: "black", backgroundColor: "white" }}><h5>{' '}Hike list</h5></Nav.Link>
                                                        :
                                                        <Nav.Link onClick={() => { navigate('/') }} onMouseOver={() => { setOver('hike-list') }} onMouseLeave={() => { setOver('') }} style={{ color: "white", backgroundColor: "#00706c" }}><h5>{' '}Hike list</h5></Nav.Link>
                                                    }
                                                    {(location.pathname === '/hut-list' || over === 'hut-list') ?
                                                        <Nav.Link onClick={() => { navigate('/hut-list') }} onMouseOver={() => { setOver('hut-list') }} onMouseLeave={() => { setOver('') }} style={{ color: "black", backgroundColor: "white" }}><h5>{' '}Hut list</h5></Nav.Link>
                                                        :
                                                        <Nav.Link onClick={() => { navigate('/hut-list') }} onMouseOver={() => { setOver('hut-list') }} onMouseLeave={() => { setOver('') }} style={{ color: "white", backgroundColor: "#00706c" }}><h5>{' '}Hut list</h5></Nav.Link>
                                                    }
                                                    <ul></ul>
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