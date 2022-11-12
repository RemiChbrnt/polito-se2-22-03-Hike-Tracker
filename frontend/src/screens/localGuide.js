import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const LocalGuide = ({ setProps }) => {

    const navigate = useNavigate();

    return (
        <Container fluid>
            <ul></ul>
            <Row>
                <Button>Add hike description</Button>
            </Row>
            <Row>
                <Button>Add parking lot</Button>
            </Row>
            <Row>
                <Button>Set points for</Button>
            </Row>
            <Row>
                <Button>Link hut to hike</Button>
            </Row>
            <ul></ul>
        </Container>

    );
}

export default LocalGuide;