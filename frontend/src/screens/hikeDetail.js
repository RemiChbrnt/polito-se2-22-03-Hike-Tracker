import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Form, Card, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";
import API from '../API.js';
import { AddReferencePointForm } from "../components/addReferencePointForm";

const HikeDetail = ({ user, props, setProps }) => {

    const [showParkings, setShowParkings] = useState(true);
    const [showHuts, setShowHuts] = useState(true);
    const [showPointsOfInterest, setShowPointsOfInterest] = useState(true);
    const [showStartAndArrival, setShowStartAndArrival] = useState(true);

    // Used to modify the display if a new reference point has to be added
    const [addNewReferencePoint, setAddNewReferencePoint] = useState(false);
    const [newReferencePointCoords, setNewReferencePointCoords] = useState(null);

    const [hike, setHike] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        API.getHikeFromID(params.hikeId)
            .then(hike => {
                setHike(hike);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [])

    const alertStyle = (status) => {
        return {
            color: status === 'open' ? 'green' : '#FF5733',
            'font-style': 'italic',
        }
    };

    return (
        <Container>
            {isLoading ?
                <Container>
                    <h5>Loading...</h5>
                </Container>
                :
                <Container>
                    <Row>
                        <Col md={10}>
                            <h1>Hike "{hike.title}"</h1>

                            {hike.statusList.map((status => <Row><p style={alertStyle(status.status)}><i class="bi bi-exclamation-triangle"></i> {status.name}: [{status.status}] {status.description}</p></Row>))}

                        </Col>
                        <Col md={2}>
                            <div className="d-grid gap-2">
                                <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
                            </div>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Check
                            inline
                            label="Show parkings"
                            type="checkbox"
                            defaultChecked={true}
                            onChange={e => setShowParkings(e.target.checked)}
                        />

                        <Form.Check
                            inline
                            label="Show huts"
                            type="checkbox"
                            defaultChecked={true}
                            onChange={e => setShowHuts(e.target.checked)}
                        />

                        <Form.Check
                            inline
                            label="Show points of interest"
                            type="checkbox"
                            defaultChecked={true}
                            onChange={e => setShowPointsOfInterest(e.target.checked)}
                        />

                        <Form.Check
                            inline
                            label="Show start and arrival"
                            type="checkbox"
                            defaultChecked={true}
                            onChange={e => setShowStartAndArrival(e.target.checked)}
                        />
                    </Form>

                    {
                        (user === undefined) ? (false && <></>) : (user.role === "guide" && user.email === hike.author) &&
                            <Col style={{ marginTop: "2%", display: "flex", width: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="white"
                                        style={{ backgroundColor: "#00706c" }}
                                        onClick={() => { setAddNewReferencePoint(true) }}>
                                        <h4 className="text-white">Add a Reference Point</h4>
                                    </Button>
                                </div>
                            </Col>
                    }
                    <ul></ul>
                    <Row>
                        <Row className="justify-content-center">
                            <Map
                                displayPoints={[showParkings, showHuts, showPointsOfInterest, showStartAndArrival]}
                                startPt={JSON.stringify(hike.startPt)}
                                endPt={JSON.stringify(hike.endPt)}
                                referencePoints={JSON.stringify(hike.referencePoints)}
                                newReferencePointCoords={newReferencePointCoords}
                                setNewReferencePointCoords={setNewReferencePointCoords}
                                addNewReferencePoint={addNewReferencePoint}
                                file={hike.track} />
                        </Row>


                        {addNewReferencePoint ?
                            <AddReferencePointForm
                                hikeId={params.hikeId}
                                userEmail={user.email}
                                pointCoords={newReferencePointCoords}
                                setAddNewReferencePoint={setAddNewReferencePoint}
                            />
                            : <Container>
                                <p></p>
                                <Row>
                                    <Col>
                                        <Row>
                                            <h4> Difficulty : <Badge bg={(hike.difficulty === "tourist") ? "success" : (hike.difficulty === "hiker") ? "warning" : "danger"}>{(hike.difficulty === "tourist") ?"Tourist Friendly" : (hike.difficulty === "hiker") ? "Casual Hiker" : "Professional Hiker"}</Badge></h4>
                                        </Row>
                                            <Row>
                                                <h4>
                                                    Expected time : {hike.expTime} hours
                                                </h4>
                                            </Row>
                                            <Row>
                                                <h4>
                                                    Length : {hike.length} km
                                                </h4>
                                            </Row>
                                            <Row>
                                                <h4>
                                                    Ascent : {hike.ascent} m
                                                </h4>
                                            </Row>
                                    </Col>
                                    <Col className="border-start border-2 border-secondary">
                                        <h3>
                                            Description
                                        </h3>
                                        <h4>
                                            {hike.description}
                                        </h4>
                                    </Col>
                                </Row>
                            </Container>
                        }
                    </Row>
                    <ul></ul>
                </Container>
            }
        </Container>
    );
}

export default HikeDetail;