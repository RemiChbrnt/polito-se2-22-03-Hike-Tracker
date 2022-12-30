import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card, Badge, ListGroup, ListGroupItem, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";
import API from '../API.js';
import { AddReferencePointForm } from "../components/addReferencePointForm";

const HikeDetail = ({ user, props, setProps }) => {

    const [showParkings, setShowParkings] = useState(true);
    const [showHuts, setShowHuts] = useState(true);
    const [showPointsOfInterest, setShowPointsOfInterest] = useState(true);
    const [showStartAndArrival, setShowStartAndArrival] = useState(true);

    const [windowSize, setWindowSize] = useState(getWindowSize());

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

    const buttonStyle = {
        width: "calc(22%)",
        margin: "calc(1%)"
    }

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

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
                <h5>Loading...</h5>
                :
                <Container style={{ width: windowSize.innerWidth / 1.1, height: windowSize.innerHeight / 1.2 }}>

                    <Row>
                        <Col md={10}><h1 id='hike-title'>Hike "{hike.title}"</h1></Col>
                        <Col>
                            <Row className="justify-content-end">
                                <Button id='home-button' variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
                            </Row>
                        </Col>
                        <Row>{hike.statusList.map(((status, i) => <Row key={i}><p id='hike-status' style={alertStyle(status.status)}><i className="bi bi-exclamation-triangle"></i> {status.name}: [{status.status}] {status.description}</p></Row>))}</Row>
                    </Row>
                    <ul></ul>
                    <Row>

                        <Col style={{ overflowY: "auto", height: "calc(100%)", minWidth: "300px" }}>
                            <Card style={{ maxHeight: windowSize.innerHeight / 1.2 }}>
                                <ListGroup variant="flush">
                                    <ListGroupItem><h3 id='hike-info-title'>Info</h3></ListGroupItem>
                                    <ListGroupItem id='hike-difficulty'>
                                        Difficulty : <Badge bg={(hike.difficulty === "tourist") ? "success" : (hike.difficulty === "hiker") ? "warning" : "danger"}>{(hike.difficulty === "tourist") ? "Tourist Friendly" : (hike.difficulty === "hiker") ? "Casual Hiker" : "Professional Hiker"}</Badge>
                                    </ListGroupItem>
                                    <ListGroupItem id='hike-expected-time'>Expected time : {hike.expTime} hours</ListGroupItem>
                                    <ListGroupItem id='hike-length'>Length : {hike.length} km</ListGroupItem>
                                    <ListGroupItem id='hike-ascent'>Ascent : {hike.ascent} m</ListGroupItem>

                                    <ListGroupItem id='hike-description'>
                                        <h5>Description</h5>
                                        {hike.description}
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                            <ul></ul>
                        </Col>
                        <Col>
                            <Row>
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
                            <Row>
                                <ButtonGroup style={{ justifyContent: "space-between" }}>
                                    <ToggleButton
                                        type="checkbox"
                                        style={buttonStyle}
                                        size="sm"
                                        id="show-parkings"
                                        variant="outline-secondary"
                                        checked={showParkings}
                                        onChange={(e) => setShowParkings(e.currentTarget.checked)}>
                                        Show Parking Lots
                                    </ToggleButton>
                                    <ToggleButton
                                        type="checkbox"
                                        style={buttonStyle}
                                        size="sm"
                                        id="show-huts"
                                        variant="outline-secondary"
                                        checked={showHuts}
                                        onChange={(e) => setShowHuts(e.currentTarget.checked)}>
                                        Show Huts
                                    </ToggleButton>
                                    <ToggleButton
                                        type="checkbox"
                                        style={buttonStyle}
                                        size="sm"
                                        id="show-points-interest"
                                        variant="outline-secondary"
                                        checked={showPointsOfInterest}
                                        onChange={(e) => setShowPointsOfInterest(e.currentTarget.checked)}>
                                        Show Points of Interest
                                    </ToggleButton>
                                    <ToggleButton
                                        type="checkbox"
                                        style={buttonStyle}
                                        size="sm"
                                        id="show-start-arrival"
                                        variant="outline-secondary"
                                        checked={showStartAndArrival}
                                        onChange={(e) => setShowStartAndArrival(e.currentTarget.checked)}>
                                        Show Start and Arrival
                                    </ToggleButton>
                                </ButtonGroup>
                            </Row>
                        </Col>
                    </Row>
                    <ul></ul>
                    {
                        (user !== undefined) &&
                        <Row>
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
                        </Row>
                    }
                </Container>
            }
            <ul></ul>
        </Container>
    );
}

export default HikeDetail;