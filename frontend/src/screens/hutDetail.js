import React, { useState, useEffect } from "react";
import { Image, Card, Col, Container, Row, ListGroup } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import API from '../API.js';

const HutDetail = ({ user, props, setProps }) => {

    const [hut, setHut] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        API.getHutById(params.hutId)
            .then(hut => {
                setHut(hut);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <Container>
            {isLoading ?
                <Container>
                    <h5>Loading...</h5>
                </Container>
                :
                <Container>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h1>Hut "{hut.name}"</h1></ListGroup.Item>
                        <ul></ul>

                        <ListGroup horizontal>
                            <ListGroup.Item style={{ width: "33%" }}><span className="fw-bold">Number of beds: </span>{(hut.numberOfBeds !== null) ? hut.numberOfBeds : "No information available"}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "33%" }}><span className="fw-bold">Cost: </span>{(hut.cost !== null) ? hut.cost : "No information available"}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "33%" }}><span className="fw-bold">Food: </span>{(hut.food !== null) ? hut.food : "No information available"}</ListGroup.Item>
                        </ListGroup>

                        <ListGroup horizontal>
                            <ListGroup.Item style={{ width: "50%" }}><span className="fw-bold">Opening time: </span>{(hut.openingTime !== null) ? hut.openingTime : "No information available"}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}><span className="fw-bold">Closing time: </span>{(hut.closingTime !== null) ? hut.closingTime : "No information available"}</ListGroup.Item>
                        </ListGroup>

                        <ListGroup horizontal>
                            <ListGroup.Item style={{ width: "50%" }}><span><span className="fw-bold">Location: </span>{(hut.address !== null) && (hut.address + ", ")} {hut.town}, {"(" + hut.province + ")"}, {hut.country}</span></ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}><span className="fw-bold">Altitude: </span>{hut.altitude} m</ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <h4 className="border-bottom">Description</h4>
                                {(hut.description !== null) ? hut.description : "No description available"}
                            </ListGroup.Item>
                        </ListGroup>

                        <Container fluid>
                            <Row>
                                {(hut.photos !== undefined) ?
                                    hut.photos.map((p, i) => {
                                        return <Card style={{ width: "33%" }} key={i}><img src={p} /></Card>
                                    })
                                    :
                                    <span>No images available</span>
                                }
                            </Row>
                        </Container>
                        <ul></ul>
                    </ListGroup>
                </Container>
            }
        </Container>
    );
}

export default HutDetail;