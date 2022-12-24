import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Form, Card, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
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

    const [startedHike, setStartedHike] = useState(false);
    const [startedDifferentHike, setStartedDifferentHike] = useState(false);

    const [hike, setHike] = useState("");
    const [groupId, setGroupId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        API.getHikeFromID(params.hikeId)
            .then(async (hike) => {
                setHike(hike);

                if (user !== undefined && user.role === "hiker") {
                    await API.getCurrentGroup()
                        .then(result => {
                            if (result !== 204) {
                                setGroupId(result.groupId);
                                if (Number(result.hikeId) === Number(params.hikeId))
                                    setStartedHike(true);
                                else
                                    setStartedDifferentHike(true);
                            }

                        }).catch(error => console.log(error));
                }

                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [])


    const alertStyle = (status) => {
        return {
            color: status === 'open' ? 'green' : '#FF5733',
            'fontStyle': 'italic',
        }
    };

    const startHike = () => {
        //for now we don't have the possibility to create a group and invite other people
        //so we just pass null as groupId 
        API.startHike({ groupId: null, hikeId: params.hikeId })
            .then(result => {
                if (result)
                    setStartedHike(true);
            }).then(() => {
                API.getCurrentGroup()
                    .then(result => {
                        if (result !== 204)
                            setGroupId(result.groupId);
                    })
            })
            .catch(err => console.log(err));

    }

    const terminateHike = () => {
        API.terminateHike({ groupId: groupId, hikeId: params.hikeId })
            .then(result => {
                if (result)
                    setStartedHike(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <Container>
            {isLoading ?
                <Container>
                    <h5>Loading...</h5>
                </Container>
                :
                <Container>
                    <Row>
                        <Row>
                            <Col md={10}><h1>Hike "{hike.title}"</h1></Col>
                            <Col>
                                <Row className="justify-content-end">
                                    <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
                                </Row>
                            </Col>
                            <Row>{hike.statusList.map(((status, i) => <Row key={i}><p style={alertStyle(status.status)}><i className="bi bi-exclamation-triangle"></i> {status.name}: [{status.status}] {status.description}</p></Row>))}</Row>
                        </Row>
                        <ul></ul>
                        <Col md={4}>

                            <ListGroup variant="flush">

                                <ListGroupItem>
                                    Difficulty : <Badge bg={(hike.difficulty === "tourist") ? "success" : (hike.difficulty === "hiker") ? "warning" : "danger"}>{(hike.difficulty === "tourist") ? "Tourist Friendly" : (hike.difficulty === "hiker") ? "Casual Hiker" : "Professional Hiker"}</Badge>
                                </ListGroupItem>
                                <ListGroupItem>Expected time : {hike.expTime} hours</ListGroupItem>
                                <ListGroupItem>Length : {hike.length} km</ListGroupItem>
                                <ListGroupItem>Ascent : {hike.ascent} m</ListGroupItem>

                                <ListGroupItem>
                                    <h5>Description</h5>
                                    {hike.description}
                                </ListGroupItem>


                            </ListGroup>
                            <ul></ul>
                        </Col>
                        <Col>
                            {/* <Row className="justify-content-center"> */}
                            <Map
                                displayPoints={[showParkings, showHuts, showPointsOfInterest, showStartAndArrival]}
                                startPt={JSON.stringify(hike.startPt)}
                                endPt={JSON.stringify(hike.endPt)}
                                referencePoints={JSON.stringify(hike.referencePoints)}
                                newReferencePointCoords={newReferencePointCoords}
                                setNewReferencePointCoords={setNewReferencePointCoords}
                                addNewReferencePoint={addNewReferencePoint}
                                file={hike.track} />
                            {/* </Row> */}
                        </Col>
                        <Row>
                            <Form style={{ display: "flex", justifyContent: "flex-end" }}>
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
                        </Row>
                        <ul></ul>
                        {
                            (user !== undefined) &&
                            <Container>
                                {
                                    (user.role === "guide") &&
                                    <Row className="justify-content-center">
                                        {/* <Col style={{ marginTop: "2%", display: "flex", width: "100%", justifyContent: "flex-end", alignItems: "center" }}> */}
                                        <Col>
                                            <Button
                                                variant="white"
                                                style={{ backgroundColor: "#00706c" }}
                                                onClick={() => { setAddNewReferencePoint(true) }}>
                                                <h4 className="text-white">Add a Reference Point</h4>
                                            </Button>
                                        </Col>


                                        {addNewReferencePoint &&
                                            <AddReferencePointForm
                                                hikeId={params.hikeId}
                                                userEmail={user.email}
                                                pointCoords={newReferencePointCoords}
                                                setAddNewReferencePoint={setAddNewReferencePoint}
                                            />
                                        }
                                    </Row>
                                }
                                {
                                    (user.role === "hiker" && startedHike === false && startedDifferentHike === false) &&
                                    <Row className="justify-content-center">
                                        <Col>
                                            <Button
                                                variant="white"
                                                style={{ backgroundColor: "#00706c" }}
                                                onClick={() => { startHike() }}>
                                                <h4 className="text-white">Start Hike</h4>
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                {

                                    (user.role === "hiker" && startedHike === true) &&
                                    <Row className="justify-content-center">

                                        <Col>
                                            <Button
                                                variant="white"
                                                style={{ backgroundColor: "#00706c" }}
                                                onClick={() => { terminateHike() }}>
                                                <h4 className="text-white">Terminate Hike</h4>
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                {
                                    (user.role === "hiker" && startedDifferentHike === true) &&
                                    <Row className="justify-content-center">
                                        <h5>You have to terminate your currently initiated hike to initiate a different hike</h5>
                                    </Row>
                                }
                            </Container>
                        }

                        <ul></ul>
                    </Row>
                </Container>
            }
        </Container>
    );
}

export default HikeDetail;