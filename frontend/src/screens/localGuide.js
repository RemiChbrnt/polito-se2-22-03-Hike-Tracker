import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { AddHikeForm } from "../components/addHikeForm";
import { AddPointForm } from "../components/addPointForm";



const LocalGuide = ({ setProps }) => {

    const navigate = useNavigate();

    const [showFormHike, setShowFormHike] = useState(false);
    const [showFormParkingLot, setShowFormParkingLot] = useState(false);
    const [showFormLinkHutToHike, setShowFormLinkHutToHike] = useState(false);


    return (
        <Container fluid>
            <ul></ul>

            <Container style={{ width: "40vw" }}>
                <Row>
                    <Button variant="white" size="lg" style={{ backgroundColor: "#00706c", color: "white" }} onClick={() => {
                        setShowFormParkingLot(false);
                        setShowFormLinkHutToHike(false);
                        setShowFormHike(true);
                    }}>Add hike description</Button>
                </Row>
                <ul></ul>
                <Row>
                    <Button variant="white" size="lg" style={{ backgroundColor: "#00706c", color: "white" }} onClick={() => {
                        setShowFormHike(false);
                        setShowFormLinkHutToHike(false);
                        setShowFormParkingLot(true);
                    }}>Add parking lot</Button>
                </Row>
                <ul></ul>
                <Row>
                    <Button variant="white" size="lg" style={{ backgroundColor: "#00706c", color: "white" }} onClick={() => {
                        setShowFormHike(false);
                        setShowFormParkingLot(false);
                        setShowFormLinkHutToHike(true);
                    }}>Link hut to hike</Button>
                </Row>
            </Container>
            <ul></ul>
            <Row>
                {showFormHike &&
                    <AddHikeForm />
                }
                {showFormParkingLot &&
                    <AddPointForm type="parkinglot" />
                }
            </Row>
        </Container>

    );
}

export default LocalGuide;