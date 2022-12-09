import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row } from 'react-bootstrap';
//import { Carousel } from 'react-carousel-minimal';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "./carousel/Carousel.js";
import API from '../API.js';

const HomeWorker = (props) => {

    const [hut, setHut] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    useEffect(() => {

        API.getHutById(props.user.hut)
            .then(hut => {
                setHut(hut);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [])

    const navigate = useNavigate();


    const captionStyle = {
        fontSize: "2em",
        fontWeight: "bold",
    };
    const slideNumberStyle = {
        fontSize: "20px",
        fontWeight: "bold",
    };

    return (
        <Container>
            {isLoading ? <h1>Loading...</h1> :
                <Container style={{ textAlign: "center" }}>
                    <h2>{hut.name}</h2>
                    <Row>
                        <Col>
                            <Row className="justify-content-md-center">
                                <Col style={{ textAlign: "justify" }} xs={8}><h4>Description</h4></Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col style={{ textAlign: "justify" }} xs={8}>{hut.description}</Col>
                            </Row>
                            <p></p>
                            <Row className="justify-content-md-center">
                                <Col style={{ textAlign: "justify" }} xs={8}><h4>Address</h4></Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col style={{ textAlign: "justify" }} xs={8}>{hut.address}</Col>
                            </Row>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            <div style={{ padding: "0 20px", }}>
                                <Carousel
                                    data={hut.photos}
                                    time={2000}
                                    width="800px"
                                    height="350px"
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
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </Container>
    );
}

export default HomeWorker;