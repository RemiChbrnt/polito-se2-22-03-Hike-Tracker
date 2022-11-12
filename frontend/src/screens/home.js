import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, Input } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";

/*const Home = ({setProps}) => {*/
function Home(props) {
  const navigate = useNavigate();

  return (
    <Container>
      <ul></ul>
      <Row>
        <h1>Hike List</h1>
      </Row>
      <ul></ul>
      <Container>
        <Row>
          <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hiker') }}>
            <h3 className="text-white">Hiker</h3>
          </Button>
          <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hike-detail-azerazer', { testparam: 15 }) }}>
            <h3 className="text-white">HikeDetail</h3>
          </Button>
        </Row>
      </Container>

      <Row>
        {/*<Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hiker') }}>
          <h3 className="text-white">Hiker</h3>
        </Button>*/}
        <HikeGrid hikes={props.hikes} />
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