import { Card, Row, Col, ListGroup, Container, Badge  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isPointInDisk } from './coordsFromMap';
import API from '../API.js';

function CompletedHikes(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [hikes, setHikes] = useState([]);

    useEffect(() => {
        API.getCompletedHikes().then(res => {
            setHikes([]);
            res.forEach((hike, index) => {
                setHikes(hikes => [...hikes, JSON.stringify(hike)]);
            });
            setIsLoading(false);
        }).catch(error => console.log(error));
    }, []);

    return (
        <Container fluid>
            {isLoading ?
                <h3>Loading...</h3>
                : <Container>
                    <h1> Completed Hikes</h1>
                    <br></br>
                    {(hikes.length === 0) ? <h2>No hikes completed yet...</h2> :
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
                            <div className="d-flex justify-content-start">
                                <i className="bi bi-activity"></i><span className="fw-bold">{"  "} Difficulty:  <Badge bg={(hike.difficulty === "tourist") ? "success" : (hike.difficulty === "hiker") ? "warning" : "danger"}>{(hike.difficulty === "tourist") ?"Tourist Friendly" : (hike.difficulty === "hiker") ? "Casual Hiker" : "Professional Hiker"}</Badge></span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item data-test-id="time"><i className="bi bi-clock-fill"></i> <span className="fw-bold">{"  "}Estimated Time : </span>{hike.expTime} hours</ListGroup.Item>
                        <ListGroup.Item data-test-id="length"><i className="bi bi-signpost-split-fill"></i> <span className="fw-bold">{"  "}Length : </span>{hike.length} km</ListGroup.Item>
                        <ListGroup.Item data-test-id="ascent"><i className="bi bi-arrow-up-right"></i> <span className="fw-bold">{"  "}Ascent : </span>{hike.ascent} m</ListGroup.Item>
                        <ListGroup.Item data-test-id="description"><ReadMore>{hike.description}</ReadMore></ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide" style={{color:"#3366CC"}}>
          {isReadMore ? "... Read More" : " Show Less"}
        </span>
      </p>
    );
  };

export { CompletedHikes };