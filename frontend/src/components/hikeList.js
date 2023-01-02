import { Card, Row, Col, ListGroup, Container, Badge, Image, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isPointInDisk } from './coordsFromMap';
import { ReadMore } from './readMore';
import API from '../API.js';

function HikeGrid(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [hikes, setHikes] = useState([]);
    const [hikesStored, setHikesStored] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        API.getHikesCount(props.filters).then(count => {
            let pages = Math.ceil(count / 10);
            setPages(pages);
            setPage(0);
            let pagination = [];
            for (let i = 0; i < pages; i++)
                pagination.push(i);

            setPagination(pagination);
        }).catch(error => console.log(error));
    }, [props.filters]);

    useEffect(() => {
        API.getAllHikes(props.filters, page).then(res => {
            setHikes([]);
            setHikesStored([]);
            res.forEach((hike, index) => {
                setHikes(hikes => [...hikes, JSON.stringify(hike)]);
                setHikesStored(hikes => [...hikes, JSON.stringify(hike)]);
            });
            setIsLoading(false);
        }).catch(error => console.log(error));
    }, [props.filters, page]);

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
                    <ul></ul>
                    <Pagination className='justify-content-center'>
                        <Pagination.First disabled={page === 0} onClick={() => { setPage(0) }} />
                        <Pagination.Prev disabled={page === 0} onClick={() => { setPage(page - 1) }} />
                        {pagination.map((p, i) => <Pagination.Item key={i} active={(page === i)} onClick={() => { setPage(i) }}>{i + 1}</Pagination.Item>)}
                        <Pagination.Next disabled={page === pages - 1} onClick={() => { setPage(page + 1) }} />
                        <Pagination.Last disabled={page === pages - 1} onClick={() => { setPage(pages - 1) }} />
                    </Pagination>
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
                    {(hike.photo !== undefined && hike.photo !== null) &&
                        <Image fluid src={require("../photos/" + hike.photo)} />}
                    <ListGroup variant="flush">

                        <ListGroup.Item data-test-id="difficulty">
                            <div className="d-flex justify-content-start">
                                <i className="bi bi-activity"></i><span className="fw-bold">{"  "} Difficulty:  <Badge bg={(hike.difficulty === "tourist") ? "success" : (hike.difficulty === "hiker") ? "warning" : "danger"}>{(hike.difficulty === "tourist") ? "Tourist Friendly" : (hike.difficulty === "hiker") ? "Casual Hiker" : "Professional Hiker"}</Badge></span>
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



export { HikeGrid };