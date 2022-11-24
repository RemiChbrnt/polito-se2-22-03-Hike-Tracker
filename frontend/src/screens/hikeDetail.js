import React, {useState, useEffect} from "react";
import { Col, Container, Row, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";

const HikeDetail = ({props, setProps}) => {

  const hike = JSON.parse(props.hike);
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
        <Row>
            <Col md={10}>
            <h1>Hike "{hike.title}"</h1>
            <h4>#{params.hikeId}</h4>
            </Col>
            <Col md={2}>
            <div className="d-grid gap-2">
                <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
            </div>
            </Col>
        </Row>
        <Row style={{flex:1, marginTop: "2%", alignItems:"center"}}>
            <Col>
                <h3>
                    Length : {hike.length} km
                </h3>
                <h3>
                    Ascent : {hike.ascent} m 
                </h3>
                <h3>
                    Expected time : {hike.expTime} hours
                </h3>
                <h3>
                    Difficulty : {hike.difficulty}
                </h3>
                <h3>
                    Description 
                </h3>
                <h4>
                    {hike.description}
                </h4>
                <h5 style={{marginTop: "2%"}}>
                    Click on the map markers for more information !
                </h5>
                

            </Col>
            <Col>
                <Map startPt={JSON.stringify(hike.startPt)} endPt={JSON.stringify(hike.endPt)} file={hike.track}/>
            </Col>
        </Row>
    </Container>

  );
}

export default HikeDetail;