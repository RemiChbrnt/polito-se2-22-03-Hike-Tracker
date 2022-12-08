import { Card, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../API.js';

function HutGrid(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [huts, setHuts] = useState([]);


    useEffect(() => {
        API.getHuts(props.filters).then(huts => {
            setHuts(huts);
            setIsLoading(false);
        }).catch(error => console.log(error));
    }, [props.filters])

    return (
        <Container fluid>
            {isLoading ?
                <h3>Loading...</h3>
                : <Container>
                    {(huts.length === 0) ? <h2>No match found with the specified filters...</h2> :
                        <Row xs={1} md={2} className="g-4">
                            {
                                huts.map((hut, index) =>
                                    <HutCard
                                        hut={hut}
                                        key={index}
                                        setProps={props.setProps} />)
                            }
                        </Row>
                    }
                </Container>}
            <ul></ul>
        </Container>
    );
}

function HutCard(props) {

    // const [photos, setPhotos] = useState();

    // useEffect(() => {
    //     if (props.hut.photos !== undefined) {
    //         let reader = new FileReader();

    //         reader.onloadend = (e) => {


    //         }

    //         let photosText = [];

    //         props.hut.photos.map((p) => {                
    //             photosText.push(p);                
    //         })
    //         setPhotos(photosText);
    //     }
    // }, []);

    const navigate = useNavigate();

    const showDetail = (() => {
        // props.setProps({ user: props.user });
        navigate("/hut-detail-" + props.hut.id);
    });


    return (
        <Col>
            <Card style={{ cursor: "pointer" }} onClick={() => { showDetail() }}>
                <Card.Body>
                    <Card.Title><h3 className="fw-bold">{props.hut.name}</h3></Card.Title>
                    <ListGroup variant="flush">
                        {/*<ListGroup.Item><span className="fw-bold">Latitude: </span>{props.hut.latitude}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Longitude: </span>{props.hut.longitude}</ListGroup.Item>*/}
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <span className="fw-bold">Number of beds: </span>{props.hut.numberOfBeds}
                                </Col>
                                <Col>
                                    <span className="fw-bold">Cost: </span>{props.hut.cost}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Food: </span>{props.hut.food}</ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <span className="fw-bold">Opening time: </span>{props.hut.openingTime}
                                </Col>
                                <Col>
                                    <span className="fw-bold">Closing time: </span>{props.hut.closingTime}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Address: </span>{props.hut.address}, {props.hut.town}, {"(" + props.hut.province + ")"}, {props.hut.country}</ListGroup.Item>
                        {/*<ListGroup.Item><span className="fw-bold">Country: </span>{props.hut.country}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Province: </span>{props.hut.province}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Town: </span></ListGroup.Item>*/}
                        <ListGroup.Item><span className="fw-bold">Altitude: </span>{props.hut.altitude} m</ListGroup.Item>
                        <ListGroup.Item>{props.hut.description}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export { HutGrid };