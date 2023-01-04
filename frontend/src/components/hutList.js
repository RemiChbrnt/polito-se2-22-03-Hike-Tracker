import { Card, Row, Col, ListGroup, Container, ListGroupItem, Image, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ReadMore } from './readMore';
import API from '../API.js';

function HutGrid(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [huts, setHuts] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        API.getHutsCount(props.filters).then(count => {
            let pages = Math.ceil(count / 10);
            setPages(pages);
            setPage(0);
            let pagination = [];
            for (let i = 0; i < pages; i++)
                pagination.push(i);

            setPagination(pagination);
        }).catch(error => console.log(error));
    }, [props.filters])


    useEffect(() => {
        API.getHuts(props.filters, page).then(huts => {
            setHuts(huts);
            setIsLoading(false);
        }).catch(error => console.log(error));
    }, [page]);


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
                                        setProps={props.setProps} />)}
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

function HutCard(props) {


    const navigate = useNavigate();

    const showDetail = (() => {
        navigate("/hut-detail-" + props.hut.id);
    });


    return (
        <Col>
            <Card style={{ cursor: "pointer" }} onClick={() => { showDetail() }}>
                <Card.Body>
                    <Card.Title><h3 id='hut-title' className="fw-bold">{props.hut.name}</h3></Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item><span id='address' className="fw-bold">Address: </span>{props.hut.address}, {props.hut.town}, {"(" + props.hut.region + ")"}, {props.hut.country}</ListGroup.Item>
                        <ListGroup.Item><span id='altitude' className="fw-bold">Altitude: </span>{(props.hut.altitude !== null) ? props.hut.altitude : "No info"}</ListGroup.Item>
                        <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
                            <span><span id='number-of-beds' className="fw-bold">Number of beds: </span>{(props.hut.numberOfBeds !== null) ? props.hut.numberOfBeds : "No info"}</span>
                            <span><span id='cost' className="fw-bold">Cost: </span>{(props.hut.numberOfBeds !== null) ? props.hut.numberOfBeds : "No info"}</span>
                        </ListGroup.Item>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
                                <span><span id='opening-time' className="fw-bold">Opening Time: </span>{(props.hut.openingTime !== null) ? props.hut.openingTime : "No info"}</span>
                                <span><span id='closing-time' className="fw-bold">Closing Time: </span>{(props.hut.closingTime !== null) ? props.hut.closingTime : "No info"}</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item><span id='food' className="fw-bold">Food: </span>{(props.hut.food !== null) ? props.hut.food : "No info"}</ListGroup.Item>
                        <ListGroup.Item>{(props.hut.description !== null) ? <ReadMore>{props.hut.description}</ReadMore> : "No description"}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export { HutGrid };