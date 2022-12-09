import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";
import { HikeFilterForm } from "./../components/hikeFilterForm";
import { CoordsFromMap } from "./../components/coordsFromMap";

import HutWorker from "./../screens/hutWorker"
import EmergencyOperator from "./../screens/emergencyOperator"

const Home = (props) => {

    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState("[]");
    const [coordsFilter, setCoordsFilter] = useState([45.116177, 7.742615]);
    const [radiusFilter, setRadiusFilter] = useState(10); // km

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
                    <h1 data-test-id="title">Hike List</h1>
                </Col>
                <Col md={2}>
                    <Button id='filter-button' onClick={() => setShow(true)} variant="light" size="lg"><i className="bi bi-sliders"></i>{" "}Filter</Button>
                </Col>
            </Row>

            <ul></ul>
            <Row>
                <HikeGrid filters={filters} coordsFilter={coordsFilter} radiusFilter={radiusFilter} user={props.user} setProps={props.setProps} />
            </Row>

            <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filter Selection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HikeFilterForm setShow={setShow} setFilters={setFilters} setCoords={setCoordsFilter} setRadiusFilter={setRadiusFilter}/>
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