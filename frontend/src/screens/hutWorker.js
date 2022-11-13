import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";


import { AddPointForm } from "../components/addPointForm";

const HutWorker = ({ setProps }) => {

    const [showFormHikeCondition, setShowFormHikeCondition] = useState(false);
    const [showFormDescribeHut, setShowFormDescribeHut] = useState(false);
    const [showFormAddHut, setShowFormAddHut] = useState(false);
    const [showFormAddHutPhotos, setShowFormAddHutPhotos] = useState(false);

    const navigate = useNavigate();

    return (
        <Container fluid>
            <ul></ul>
            <Row>
                <Button onClick={() => {
                    setShowFormDescribeHut(false);
                    setShowFormAddHut(false);
                    setShowFormAddHutPhotos(false)
                    setShowFormHikeCondition(true);
                }}>Update condition of hikes connected to the hut</Button>
            </Row>
            <ul></ul>
            <Row>
                <Button onClick={() => {
                    setShowFormHikeCondition(false);
                    setShowFormAddHut(false);
                    setShowFormAddHutPhotos(false)
                    setShowFormDescribeHut(true);
                }}>Add information on the hut</Button>
            </Row>
            <ul></ul>
            <Row>
                <Button onClick={() => {
                    setShowFormHikeCondition(false);
                    setShowFormDescribeHut(false);
                    setShowFormAddHutPhotos(false)
                    setShowFormAddHut(true);
                }}>Add hut</Button>
            </Row>
            <ul></ul>
            <Row>
                <Button onClick={() => {
                    setShowFormHikeCondition(false);
                    setShowFormDescribeHut(false);
                    setShowFormAddHut(false);
                    setShowFormAddHutPhotos(true)
                }}>Add hut photos</Button>
            </Row>
            <ul></ul>
            <Row>
                {showFormHikeCondition &&
                    <div></div>
                }
                {showFormDescribeHut &&
                    <div></div>
                }
                {showFormAddHut &&
                    <AddPointForm type="hut" />
                }
                {showFormAddHutPhotos &&
                    <div></div>
                }
            </Row>
            <ul></ul>
        </Container>

    );
}

export default HutWorker;