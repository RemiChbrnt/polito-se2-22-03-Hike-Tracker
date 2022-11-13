import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, Input } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";

import HutWorker from "./../screens/hutWorker"
import LocalGuide from "./../screens/localGuide"
import EmergencyOperator from "./../screens/emergencyOperator"

const Home = ({ props, setProps }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <ul></ul>
            {(props !== null && props.user !== undefined) && (

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

            <Row>
                <h1>Hike List</h1>
            </Row>
            <ul></ul>
            <Container>
                <Row>
                    <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hiker') }}>
                        <h3 className="text-white">Hiker</h3>
                    </Button>
                </Row>
            </Container>

            <Row>
                {/*<Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hiker') }}>
                        <h3 className="text-white">Hiker</h3>
                        </Button>*/}
                <HikeGrid setProps={setProps} />
            </Row>

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