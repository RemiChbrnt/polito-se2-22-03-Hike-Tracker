import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const EmergencyOperator = ({ setProps }) => {

    const navigate = useNavigate();

    return (
        <Container fluid>
            <ul></ul>
            <Row>
                Emergency Operator
            </Row>
            <ul></ul>
        </Container>

    );
}

export default EmergencyOperator;