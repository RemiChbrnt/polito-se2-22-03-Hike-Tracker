import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const HutWorker = ({ setProps }) => {

    const navigate = useNavigate();

    return (
        <Container fluid>
            <ul></ul>
            <Row>
                <Button>Update condition of hikes connected to the hut</Button>
            </Row>
            <Row>
                <Button>Add information on the hut</Button>
            </Row>
            <ul></ul>
        </Container>

    );
}

export default HutWorker;