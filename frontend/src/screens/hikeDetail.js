import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";
import API from '../API.js';

const HikeDetail = ({ props, setProps }) => {

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
                    <ul></ul>
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
                            <Map startPt={JSON.stringify(hike.startPt)} endPt={JSON.stringify(hike.endPt)} file={hike.track} />
                        </Col>
                    </Row>
                    <ul></ul>
                </Container>
            }
        </Container>
    );
}

export default HikeDetail;