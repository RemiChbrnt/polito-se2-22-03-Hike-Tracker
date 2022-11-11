import React, {useState, useEffect} from "react";
import { Col, Container, Row, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../components/map.js";

const HikeDetail = ({props, setProps}) => {

  console.log(props);
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
        <Row>
            <Col md={10}>
            <h1>Hike "{props.hikeTitle}"</h1>
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
                    Length : {props.hikeLength} km
                </h3>
                <h3>
                    Ascent : {props.hikeAscent} m 
                </h3>
                <h3>
                    Expected time : {props.hikeExpTime} hours
                </h3>
                <h3>
                    Difficulty : {props.hikeDifficulty}
                </h3>
                <h3>
                    Description 
                </h3>
                <h4>
                    {props.hikeDescription}
                </h4>
                <h3>

                </h3>

            </Col>
            <Col>
                <Map startPt={props.hikeStartPt} endPt={props.hikeEndPt}/>
            </Col>
        </Row>
    </Container>

  );
}

export default HikeDetail;