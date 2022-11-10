import React, {useState, useEffect} from "react";
import { Col, Container, Row, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";

const HikeDetail = () => {

  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
        <Row>
            <Col md={10}>
            <h1>Hike {params.hikeId}</h1>
            <h1>{}</h1>

            </Col>
            <Col md={2}>
            <div className="d-grid gap-2">
                <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
            </div>
            </Col>
        </Row>
        <Container styke={{width: 1000, height: 800}}>
            <Map/>
        </Container>
    </Container>

  );
}

export default HikeDetail;