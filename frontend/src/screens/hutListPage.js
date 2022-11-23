import React, { useState } from "react";
import { Col, Container, Button, Row, Modal } from 'react-bootstrap';
import { HutGrid } from "./../components/hutList";
import { HutFilterForm } from "./../components/hutFilterForm";

function HutListPage(props){

    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState("[]");
    console.log("filters", filters);

    return(
        <Container>
            <Row>
                <Col md={10}>
                    <h1>Hut List</h1>
                </Col>
                <Col md={2}>
                    <Button onClick={() => setShow(true)} variant="light" size="lg"><i className="bi bi-search"></i>{" "}Search</Button>
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