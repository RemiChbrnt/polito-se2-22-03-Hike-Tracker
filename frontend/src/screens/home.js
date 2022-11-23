import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";
import { HikeFilterForm } from "./../components/hikeFilterForm";

import HutWorker from "./../screens/hutWorker"
import LocalGuide from "./../screens/localGuide"
import EmergencyOperator from "./../screens/emergencyOperator"

const Home = (props) => {

    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState("[]");

    const navigate = useNavigate();

    return (
        <Container>
            {/*<ul></ul>
            {(props !== undefined && props.user !== undefined) && (

                (props.user.role === "hutworker") &&
                <Row>
                    <h2>Hut Worker</h2>
                    <HutWorker />
                </Row>

                ||

                (props.user.role === "guide") &&
                <Row>
                    <h2>Local Guide</h2>
                    <LocalGuide />
                </Row>

                ||

                (props.user.role === "emergency") &&
                <Row>
                    <h2>Emergency Operator</h2>
                    <EmergencyOperator />
                </Row>
            )}
            <ul></ul>*/}


            <Row>
                <Col md={10}>
                    <h1>Hike List</h1>
                </Col>
                <Col md={2}>
                    <Button onClick={() => setShow(true)} variant="light" size="lg"><i className="bi bi-sliders"></i>{" "}Filter</Button>
                </Col>
            </Row>

            <ul></ul>
            <Row>
                <HikeGrid filters={filters} setProps={props.setProps} />
            </Row>

            <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filter Selection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HikeFilterForm setShow={setShow} setFilters={setFilters} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

const styles = {
    "container": {
        display: "flex",
        flexDirection: "column",
    }
}

export default Home;