import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, ListGroup, Nav } from 'react-bootstrap';
//import { Carousel } from 'react-carousel-minimal';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "./carousel/Carousel.js";
import { HutInfo, HutPhotos } from "./hutDetail"
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
                    <ul></ul>
                    <Row>
                        <Col>
                            <HutInfo hut={hut} />
                            <Row>
                                <Col style={{ textAlign: "center" }}><Button type="submit" className="guideBtn" borderless="true">Modify Info</Button></Col>
                                <Col xs={7}> <Button type="submit" className="guideBtn" borderless="true"><Nav.Link onClick={() => { navigate('/add-hut-photo') }}>Add Photo</Nav.Link></Button></Col>
                            </Row>
                        </Col>
                        <HutPhotos photos={photos} />
                    </Row>

                </Container>
            }
        </Container>
    );
}

export default HomeWorker;