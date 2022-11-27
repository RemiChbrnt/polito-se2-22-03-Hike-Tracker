import { Card, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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
                                huts.map((hut, index) => <HutCard hut={hut} key={index} setProps={props.setProps} />)
                            }
                        </Row>
                    }
                </Container>}
            <ul></ul>
        </Container>
    );
}

function HutCard(props) {

    //console.log(props.hut);

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Title><h3 className="fw-bold">{props.hut.name}</h3></Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item><span className="fw-bold">Latitude: </span>{props.hut.latitude}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Longitude: </span>{props.hut.longitude}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Country: </span>{props.hut.country}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Province: </span>{props.hut.province}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Town: </span>{props.hut.town}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Address: </span>{props.hut.address}</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Altitude: </span>{props.hut.altitude} m</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export { HutGrid };