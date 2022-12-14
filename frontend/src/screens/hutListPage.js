import React, { useState } from "react";
import { Col, Container, Button, Row, Modal } from 'react-bootstrap';
import { HutGrid } from "./../components/hutList";
import { HutFilterForm } from "./../components/hutFilterForm";

function HutListPage(props) {

    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState("[]");

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1 id='hut-list-title'>Hut List</h1>
                </Col>
                <Col md={2}>
                    <Button id='reset-filter-button' onClick={() => setFilters(JSON.stringify([]))} variant="light" size="lg">{" "}Reset filters</Button>
                </Col>
                <Col md={2}>
                    <Button id='search-button' onClick={() => setShow(true)} variant="light" size="lg"><i className="bi bi-search"></i>{" "}Search</Button>
                </Col>
            </Row>

            <ul></ul>
            <Row>
                <HutGrid filters={filters} setProps={props.setProps} />
            </Row>

            <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Search for Hut</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HutFilterForm setShow={setShow} setFilters={setFilters} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export { HutListPage };