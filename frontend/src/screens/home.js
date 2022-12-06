import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";
import { HikeFilterForm } from "./../components/hikeFilterForm";

import HutWorker from "./../screens/hutWorker"
import EmergencyOperator from "./../screens/emergencyOperator"
import API from "../API";

const Home = (props) => {

    const [show, setShow] = useState(false);
    const [filters, setFilters] = useState("[]");

    const navigate = useNavigate();

    const suggestHikes = async () => {
        const prefs = await API.getPreferences();
        const minAscent = 0.9 * Number(prefs.body.ascent);
        const maxAscent = 1.1 * Number(prefs.body.ascent);
        const minDuration = 0.9 * Number(prefs.body.duration);
        const maxDuration = 1.1 * Number(prefs.body.duration);
        let filters = [];
        filters.push({key: "minAscent", value: minAscent});
        filters.push({key: "maxAscent", value: maxAscent});
        filters.push({key: "minTime", value: minDuration});
        filters.push({key: "maxTime", value: maxDuration});
        setFilters(JSON.stringify(filters));
    }

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
                <Col md={1}>
                    <Button onClick={() => setShow(true)} variant="light" size="lg"><i className="bi bi-sliders"></i>{" "}Filter</Button>
                </Col>
                {
                props.user &&
                    <Col md={1}>
                        <Button onClick={() => suggestHikes()} variant="success" size="lg">{" "}Suggested hikes</Button>
                    </Col>
                }
            </Row>

            <ul></ul>
            <Row>
                <HikeGrid filters={filters} user={props.user} setProps={props.setProps} />
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