import React, { useState, useEffect } from "react";
import { Image, Card, Col, Container, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Carousel } from "./carousel/Carousel.js";
import API from '../API.js';

const HutDetail = ({ user, props, setProps }) => {

    const [hut, setHut] = useState("");
    const [photos, setPhotos] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        API.getHutById(params.hutId)
            .then(hut => {
                setHut(hut);
                try {
                    if (hut.photos !== undefined && hut.photos.length !== 0) {
                        let data = [];
                        hut.photos.map((p) => {
                            data.push(require("../photos/" + p.fileName));
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

        setIsLoading(false);
    }, [])


    return (
        <Container>
            {isLoading ?
                <Container>
                    <h5>Loading...</h5>
                </Container>
                :
                <Container className="container-hut">
                    <Row><h2 style={{ textAlign: "center" }}>{hut.name}</h2></Row>
                    <ul></ul>
                    <Row>
                        <HutInfo hut={hut} />

                        <HutPhotos photos={photos} />
                    </Row>
                </Container>
            }
        </Container>
    );
}



const HutInfo = (props) => {

    const hut = props.hut;

    return (
        <Col>

            <Row><h4>Description</h4></Row>
            <ListGroup variant="flush">
                <ListGroupItem>{hut.description}</ListGroupItem>
            </ListGroup>
            <ul></ul>

            <Row><h4>General Info</h4></Row>
            <ListGroup variant="flush">
                <ListGroupItem><span><b>Opening Time: </b>{(hut.openingTime !== null) ? hut.openingTime : "No information available"}</span></ListGroupItem>
                <ListGroupItem><span><b>Closing Time: </b>{(hut.closingTime !== null) ? hut.closingTime : "No information available"}</span></ListGroupItem>
                <ListGroupItem><span><b>Number of beds: </b>{(hut.numberOfBeds !== null) ? hut.numberOfBeds : "No information available"}</span></ListGroupItem>
                <ListGroupItem><span><b>Cost: </b>{(hut.cost !== null) ? hut.cost : "No information available"}</span></ListGroupItem>
                <ListGroupItem><span><b>Food: </b>{(hut.food !== null) ? hut.food : "No information available"}</span></ListGroupItem>
            </ListGroup>

            <ul></ul>
            <Row><h4>Position</h4></Row>
            <ListGroup variant="flush">
                <ListGroupItem><span><b>Altitude: </b>{(hut.altitude !== null) ? hut.altitude + " m" : "No information available"}</span></ListGroupItem>
                <ListGroupItem><span><b>Address: </b>{(hut.address !== null) ? hut.address : "No information available"}</span></ListGroupItem>
            </ListGroup>

        </Col>
    )
}


const HutPhotos = (props) => {

    const photos = props.photos;
    const captionStyle = {
        fontSize: "2em",
        fontWeight: "bold",
    };
    const slideNumberStyle = {
        fontSize: "20px",
        fontWeight: "bold",
    };

    return (
        <Col style={{ textAlign: "center" }}>
            <div style={{ padding: "0 20px", }}>
                {(photos !== undefined && photos.length !== 0) && <Carousel
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
    );
}


export { HutDetail, HutInfo, HutPhotos };