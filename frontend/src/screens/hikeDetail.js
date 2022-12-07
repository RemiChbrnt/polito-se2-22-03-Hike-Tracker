import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";
import API from '../API.js';
import { AddReferencePointForm } from "../components/addReferencePointForm";

const HikeDetail = ({user, props, setProps }) => {

    const [showParkings, setShowParkings] = useState(true);
    const [showHuts, setShowHuts] = useState(true);
    const [showPointsOfInterest, setShowPointsOfInterest] = useState(true);
    const [showStartAndArrival, setShowStartAndArrival] = useState(true);

    // Used to modify the display if a new reference point has to be added
    const [addNewReferencePoint, setAddNewReferencePoint] = useState(false);
    const [newReferencePointCoords, setNewReferencePointCoords] = useState (null);

    const [hike, setHike] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        API.getHikeFromID(params.hikeId)
            .then(hike => { 
                console.log(hike);
                setHike(hike);
                setIsLoading(false);
            })
            .catch(error => console.log(error)); 
    }, [])

    return (
        <Container>
            {isLoading?
                <Container>
                    <h5>Loading...</h5>
                </Container>
            :
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
                    <Row>
                        <Col>
                            <label for="parking" className="pr-5">
                                Show Parkings &emsp;
                            </label>
                            <input
                                type="checkbox"
                                id="parking"
                                checked={showParkings}
                                onChange={e => setShowParkings(e.target.checked)}
                            />
                        </Col>
                        <Col>
                            <label for="hut" >
                                Show Huts &emsp;
                            </label>
                            <input
                                type="checkbox"
                                id="hut"
                                checked={showHuts}
                                onChange={e => setShowHuts(e.target.checked)}
                            />
                        </Col>
                        <Col>
                            <label for="pointsInterest">
                                Show Points of Interest &emsp;
                            </label>
                            <input
                                type="checkbox"
                                id="pointsInterest"
                                checked={showPointsOfInterest}
                                onChange={e => setShowPointsOfInterest(e.target.checked)}
                            />
                        </Col>
                        <Col>
                            <label for="startAndArrival">
                                Show Start & Arrival Points &emsp;
                            </label>
                            <input
                                type="checkbox"
                                id="startAndArrival"
                                checked={showStartAndArrival}
                                onChange={e => setShowStartAndArrival(e.target.checked)}
                            />
                        </Col>                     
                    </Row>

                    {(user === undefined )? (false && <></>) : (user.role === "guide") && 
                        <Col style={{marginTop: "2%", display: "flex", width:"100%", justifyContent:"flex-end", alignItems:"center"}}>
                            <div className="d-grid gap-2">
                                <Button 
                                    variant="white" 
                                    style={{ backgroundColor: "#00706c" }}
                                    onClick={() => {setAddNewReferencePoint(true)}}>
                                        <h4 className="text-white">Add a Reference Point</h4>
                                </Button>
                            </div>
                        </Col>
                    }
                    <ul></ul>
                    <Row style={{ flex: 1, marginTop: "2%", alignItems: "center" }}>
                        <Row className="border border-3 border-secondary">
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
                        {addNewReferencePoint?
                            <AddReferencePointForm 
                                hikeId={params.hikeId} 
                                userEmail={user.email} 
                                pointCoords={newReferencePointCoords}
                                setAddNewReferencePoint={setAddNewReferencePoint}
                            />
                        :<Row>
                            <Col>
                                <div class="d-flex justify-content-start">
                                    <h4>
                                            Difficulty :
                                    </h4>
                                    <div style={{backgroundColor : (hike.difficulty==="tourist") ?
                                            "darkGreen" : (hike.difficulty==="hiker") ?
                                            "orange" : "red",
                                            marginLeft: "2%"
                                        }}>
                                        <h4 style={{textAlign: "center", color: "white", paddingLeft: 10, paddingRight: 10}}>
                                            { (hike.difficulty==="tourist") ?
                                            "Tourist Friendly" : (hike.difficulty==="hiker") ?
                                            "Casual Hiker" : "Professional Hiker"}
                                        </h4>
                                    </div>
                                </div>
                                <h4>
                                    Expected time : {hike.expTime} hours
                                </h4>
                                <h4>
                                    Length : {hike.length} km
                                </h4>
                                <h4>
                                    Ascent : {hike.ascent} m
                                </h4>
                            </Col>

                            <Col className="border-start border-2 border-secondary">
                                <h3>
                                    Description
                                </h3>
                                <h4>
                                    {hike.description}
                                </h4>
                            </Col>
                        </Row>}       
                    </Row>
                    <ul></ul>
                </Container>
            }
        </Container>
    );
}

export default HikeDetail;