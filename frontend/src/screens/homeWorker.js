import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, ListGroup, Nav } from 'react-bootstrap';
//import { Carousel } from 'react-carousel-minimal';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "./carousel/Carousel.js";
import API from '../API.js';

const HomeWorker = (props) => {

    const [hut, setHut] = useState("");
    const [photos, setPhotos] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        API.getHutById(props.user.hut)
            .then(async (hut) => {
                setHut(hut);
                try {
                    if (hut.photos !== undefined && hut.photos.length !== 0) {
                        let data = [];
                        hut.photos.map((p) => {
                            data.push(require("../photos/" + p));
                        })
                        setPhotos(data);
                    }
                    setIsLoading(false);
                    return;
                } catch (e) {
                    return;
                }


            })
            .catch(error => console.log(error));
    }, [])

    const captionStyle = {
        fontSize: "2em",
        fontWeight: "bold",
    };
    const slideNumberStyle = {
        fontSize: "20px",
        fontWeight: "bold",
    };

    return (
        <Container className="container-hut">
            {isLoading ? <h1>Loading...</h1> :
                <Container className="container-hut">
                    <Row><h2 style={{ textAlign: "center" }}>{hut.name}</h2></Row>
                    <Row>
                        <p></p>
                        <p></p>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <p></p>
                                <p></p>
                            </Row>
                            <Row >
                                <Col style={{ textAlign: "justify" }}><h4>Description</h4></Col>
                            </Row>
                            <Row >
                                <Col style={{ textAlign: "justify" }}>{hut.description}</Col>
                            </Row>
                            <p></p>
                            <Row >
                                <Col style={{ textAlign: "justify" }}><h4>General Info</h4></Col>
                            </Row>
                            <Row >
                                <Col>
                                    <Row style={{ textAlign: "justify" }}><p><b>Opening Time: </b>{(hut.openingTime !== null) ? hut.openingTime : "No information available"}</p></Row>
                                    <Row style={{ textAlign: "justify" }}><p><b>Closing Time: </b>{(hut.closingTime !== null) ? hut.closingTime : "No information available"}</p></Row>
                                    <Row style={{ textAlign: "justify" }}><p><b>Number of beds: </b>{(hut.numberOfBeds !== null) ? hut.numberOfBeds : "No information available"}</p></Row>
                                    <Row style={{ textAlign: "justify" }}><p><b>Cost: </b>{(hut.cost !== null) ? hut.cost : "No information available"}</p></Row>
                                    <Row style={{ textAlign: "justify" }}><span><b>Food: </b>{(hut.food !== null) ? hut.food : "No information available"}</span></Row>
                                </Col>
                            </Row>
                            <p></p>
                            <Row >
                                <Col style={{ textAlign: "justify" }}><h4>Position</h4></Col>
                            </Row>
                            <Row >
                                <Col>
                                    <Row style={{ textAlign: "justify" }}><p><b>Altitude: </b>{(hut.altitude !== null) ? hut.altitude + " m" : "No information available"}</p></Row>
                                    <Row style={{ textAlign: "justify" }}><p><b>Address: </b>{(hut.address !== null) ? hut.address : "No information available"}</p></Row>
                                </Col>
                            </Row>
                            <p></p>
                            <Row>
                                <Col style={{ textAlign: "center" }}><Button type="submit" className="guideBtn" borderless="true">Modify Info</Button></Col>
                                <Col xs={7}> <Button type="submit" className="guideBtn" borderless="true"><Nav.Link onClick={() => { navigate('/add-hut-photo') }}>Add Photo</Nav.Link></Button></Col>
                            </Row>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            <div style={{ padding: "0 20px", }}>
                                {(hut.photos !== undefined && hut.photos.length !== 0) && <Carousel
                                    data={photos}
                                    time={2000}
                                    width="800px"
                                    height="400px"
                                    captionStyle={captionStyle}
                                    radius="10px"
                                    slideNumber={true}
                                    slideNumberStyle={slideNumberStyle}
                                    captionPosition="bottom"
                                    automatic={false}
                                    dots={true}
                                    pauseIconColor="white"
                                    pauseIconSize="40px"
                                    slideBackgroundColor="darkgrey"
                                    slideImageFit="cover"
                                    thumbnails={true}
                                    thumbnailWidth="100px"
                                    showNavBtn={true}
                                    style={{
                                        textAlign: "center",
                                        maxWidth: "850px",
                                        margin: "40px auto",
                                    }}
                                />}
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </Container>
    );
}

export default HomeWorker;