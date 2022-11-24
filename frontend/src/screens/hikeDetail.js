import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";
import API from '../API.js';

const HikeDetail = ({ props, setProps }) => {

    const hike = JSON.parse(props.hike);
    const navigate = useNavigate();
    const params = useParams();

    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [startPoint, setStartPoint] = useState();
    const [endPoint, setEndPoint] = useState();
    const [locationList, setLocationList] = useState([]);

    console.log("StartPoint", startPoint);
    console.log("EndPoint", endPoint);

    /*useEffect(() => {
        API.getHutsAndParkingLots().then(res => {
            setHikes([]);
            res.forEach((hike, index) => {
                setHikes(hikes => [...hikes, JSON.stringify(hike)]);
            });
            // console.log(hikes);
            setIsLoading(false);
        }).catch(error => console.log(error));
    }, [props.filters])*/

    const handleStartSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpenStart(false);
        if(startPoint!==undefined){
            console.log("CIAOCIAO")
            API.setHikeStartPoint(hike.id, startPoint).then().catch(error => console.log(error));
        }
        else
        {
            //Messaggio di errore
        }
          
    }

    const handleArrivalSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpenEnd(false);
        if(endPoint!==undefined){
            API.setHikeEndPoint(hike.id, endPoint).then().catch(error => console.log(error))
        }
        else
        {
            //Messaggio di errore
        }
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
                            {(hike.startPt !== undefined && openEnd !== true) ?
                                <Button onClick={() => { setOpenStart(!openStart); setStartPoint(); API.getHutsAndParkingLots().then(locations => { setLocationList(locations) }).catch(error => console.log(error)); }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openStart} variant="success" size="lg"><h4 className="text-white"> Add Start Point</h4></Button>
                                :
                                (hike.startPt !== undefined && openEnd === true) ?
                                    <Button onClick={() => { setOpenStart(!openStart); setStartPoint(); API.getHutsAndParkingLots().then(locations => { setLocationList(locations) }).catch(error => console.log(error)); }}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openStart} variant="success" size="lg" disabled><h4 className="text-white"> Add Start Point</h4></Button>
                                    :
                                    false
                            }
                        </Col>
                        <Col>
                            {(hike.endPt !== undefined && openStart !== true) ?
                                <Button onClick={() => { setOpenEnd(!openEnd); setEndPoint(); API.getHutsAndParkingLots().then(locations => { setLocationList(locations) }).catch(error => console.log(error)); }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openEnd} variant="success" size="lg"><h4 className="text-white"> Add End Point</h4></Button>
                                :
                                (hike.endPt !== undefined && openStart === true) ?
                                    <Button onClick={() => { setOpenEnd(!openEnd); setEndPoint(); API.getHutsAndParkingLots().then(locations => { setLocationList(locations) }).catch(error => console.log(error)); }}
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
                            <Form onSubmit={handleStartSubmit}>
                                <Form.Group>
                                    <h5>Select Start Point: </h5>
                                    <Form.Select value={startPoint}
                                        onChange={e => setStartPoint(e.target.value)}
                                        aria-label="region" size="lg">
                                        <option value={undefined}>Select the Start Point</option>
                                        {locationList.map((location, index) => <option value={location.id} key={index}>{location.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                                <ul></ul>
                                <Row>
                                    <Col md={10} xs={8}>
                                        <Button variant="danger" onClick={() => {setStartPoint(); setOpenStart(false)}} size="lg">
                                            Back
                                        </Button>
                                    </Col>
                                    <Col md={2} xs={4}>
                                        <Button variant="success" type="submit" size="lg">
                                            Confirm
                                        </Button>
                                    </Col>
                                </Row>
                                <ul></ul>
                            </Form>
                        </Collapse>

                        <Collapse in={openEnd}>
                            <Form onSubmit={handleArrivalSubmit}>
                                <Form.Group>
                                    <h5>Select Arrival Point: </h5>
                                    <Form.Select value={endPoint}
                                        onChange={e => setEndPoint(e.target.value)}
                                        aria-label="region" size="lg">
                                        <option value={undefined}>Select the Arrival Pont</option>
                                        {locationList.map((location, index) => <option value={location.id} key={index}>{location.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                                <ul></ul>
                                <Row>
                                    <Col md={10} xs={8}>
                                        <Button variant="danger" onClick={() => {}} size="lg">
                                            Back
                                        </Button>
                                    </Col>
                                    <Col md={2} xs={4}>
                                        <Button variant="success" type="submit" size="lg">
                                            Confirm
                                        </Button>
                                    </Col>
                                </Row>
                                <ul></ul>
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