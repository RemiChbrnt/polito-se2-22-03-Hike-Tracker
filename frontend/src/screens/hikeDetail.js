import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";

const HikeDetail = ({ props, setProps }) => {

    const hike = JSON.parse(props.hike);
    const navigate = useNavigate();
    const params = useParams();

    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [startPoint, setStartPoint] = useState();
    const [endPoint, setEndPoint] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <h1>Hike "{hike.title}"</h1>
                    <h4>#{params.hikeId}</h4>
                </Col>
                <Col md={2}>
                    <div className="d-grid gap-2">
                        <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
                    </div>
                </Col>
            </Row>
            <ul></ul>
            {(props.user !== undefined && props.user.role === "guide") ?
                <div>
                    <Row>
                        <Col>
                            {(hike.startPt === undefined && openEnd !== true) ?
                                <Button onClick={() => { setOpenStart(!openStart) }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openStart} variant="success" size="lg"><h4 className="text-white"> Add Start Point</h4></Button>
                                :
                                (hike.startPt === undefined && openEnd === true) ?
                                    <Button onClick={() => { setOpenStart(!openStart) }}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openStart} variant="success" size="lg" disabled><h4 className="text-white"> Add Start Point</h4></Button>
                                    :
                                    false
                            }
                        </Col>
                        <Col>
                            {(hike.endPt === undefined && openStart !== true) ?
                                <Button onClick={() => { setOpenEnd(!openEnd) }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openEnd} variant="success" size="lg"><h4 className="text-white"> Add End Point</h4></Button>
                                :
                                (hike.endPt === undefined && openStart === true) ?
                                    <Button onClick={() => { setOpenEnd(!openEnd) }}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openEnd} variant="success" size="lg" disabled><h4 className="text-white"> Add End Point</h4></Button>
                                    :
                                    false
                            }
                        </Col>
                    </Row>
                    <ul></ul>
                    <Row>
                        <Collapse in={openStart}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Select value={startPoint}
                                        onChange={e => setStartPoint(e.target.value)}
                                        aria-label="region" size="lg">
                                        <option>Select the Start Pont</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Collapse>

                        <Collapse in={openEnd}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Select value={endPoint}
                                        onChange={e => setEndPoint(e.target.value)}
                                        aria-label="region" size="lg">
                                        <option>Select the End Pont</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Collapse>
                    </Row>
                    <ul></ul>
                </div>
                :
                false
            }
            <Row style={{ flex: 1, marginTop: "2%", alignItems: "center" }}>
                <Col>
                    <h3>
                        Length : {hike.length} km
                    </h3>
                    <h3>
                        Ascent : {hike.ascent} m
                    </h3>
                    <h3>
                        Expected time : {hike.expTime} hours
                    </h3>
                    <h3>
                        Difficulty : {hike.difficulty}
                    </h3>
                    <h3>
                        Description
                    </h3>
                    <h4>
                        {hike.description}
                    </h4>
                    <h3>

                    </h3>

                </Col>
                <Col>
                    <Map startPt={JSON.stringify(hike.startPt)} endPt={JSON.stringify(hike.endPt)} />
                </Col>
            </Row>
            <ul></ul>
        </Container>

    );
}

export default HikeDetail;