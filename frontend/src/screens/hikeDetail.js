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
                        <Col md={10}>
                            <h1>Hike "{hike.title}"</h1>

                            {hike.statusList.map((status => <Row><p style={alertStyle(status.status)}><i class="bi bi-exclamation-triangle"></i> {status.name}: [{status.status}] {status.description}</p></Row>))}

                        </Col>
                        <Col md={2}>
                            <div className="d-grid gap-2">
                                <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
                            </div>
                        </Col>
                        <Row>{hike.statusList.map(((status, i) => <Row key={i}><p style={alertStyle(status.status)}><i className="bi bi-exclamation-triangle"></i> {status.name}: [{status.status}] {status.description}</p></Row>))}</Row>
                    </Row>
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
            <ul></ul>
        </Container>
    );
}

export default HikeDetail;