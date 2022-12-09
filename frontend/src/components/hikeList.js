import { Card, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isPointInDisk } from './coordsFromMap';
import API from '../API.js';

function HikeGrid(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [hikes, setHikes] = useState([]);
    const [hikesStored, setHikesStored] = useState([]);

    useEffect(() => {
        API.getAllHikes(props.filters).then(res => {
            setHikes([]);
            setHikesStored([]);
            res.forEach((hike, index) => {
                setHikes(hikes => [...hikes, JSON.stringify(hike)]);
                setHikesStored(hikes => [...hikes, JSON.stringify(hike)]);
            });
            
            // console.log(hikes);
            setIsLoading(false);
        }).catch(error => console.log(error));
    }, [props.filters]);

    useEffect(() => {
        // Filtering with zone Coordinates on modification
        setHikes(hikes => hikesStored.filter((hike) => isPointInDisk([JSON.parse(hike).startPt.latitude, JSON.parse(hike).startPt.longitude], props.coordsFilter, props.radiusFilter)));
    }, [props.coordsFilter, props.radiusFilter]);

    return (
        <Container fluid>
            {isLoading ?
                <h3>Loading...</h3>
                : <Container>
                    {(hikes.length === 0) ? <h2>No match found with the specified filters...</h2> :
                        <Row xs={1} md={2} className="g-4">
                            {
                                hikes.map((hike, index) => <HikeCard hike={hike} key={index} user={props.user} setProps={props.setProps} />)
                            }
                        </Row>
                    }
                </Container>}
            <ul></ul>
        </Container>
    );
}

function HikeCard(props) {
    const navigate = useNavigate();

    const hike = JSON.parse(props.hike);

    const showDetail = (() => {
        props.setProps({ user: props.user });
        navigate("/hike-detail-" + hike.id);
    });

    return (
        <Col>
            <Card style={{ cursor: "pointer" }} onClick={() => { showDetail() }}>
                <Card.Body>
                    <Card.Title><h3 className="fw-bold">{hike.title}</h3></Card.Title>
                    <ListGroup variant="flush">
                        
                        <ListGroup.Item data-test-id="difficulty">
                            <div class="d-flex justify-content-start">
                                <i class="bi bi-activity"></i><span className="fw-bold">{"  "}Difficulty : </span>
                                <div style={{backgroundColor : (hike.difficulty==="tourist") ?
                                        "darkGreen" : (hike.difficulty==="hiker") ?
                                        "orange" : "red",
                                        marginLeft: "2%"
                                    }}>
                                    <h6 style={{textAlign: "center", color: "white", paddingLeft: 10, paddingRight: 10}}>
                                        { (hike.difficulty==="tourist") ?
                                        "Tourist Friendly" : (hike.difficulty==="hiker") ?
                                        "Casual Hiker" : "Professional Hiker"}
                                    </h6>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item data-test-id="time"><i class="bi bi-clock-fill"></i> <span className="fw-bold">{"  "}Estimated Time : </span>{hike.expTime} hours</ListGroup.Item>
                        <ListGroup.Item data-test-id="length"><i class="bi bi-signpost-split-fill"></i> <span className="fw-bold">{"  "}Length : </span>{hike.length} km</ListGroup.Item>
                        <ListGroup.Item data-test-id="ascent"><i class="bi bi-arrow-up-right"></i> <span className="fw-bold">{"  "}Ascent : </span>{hike.ascent} m</ListGroup.Item>
                        <ListGroup.Item data-test-id="description">{hike.description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export { HikeGrid };