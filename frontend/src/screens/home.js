import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ul></ul>
      <Row>
        <h1>Hike List</h1>
      </Row>
      <Row>
        {/*<Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hiker') }}>
          <h3 className="text-white">Hiker</h3>
        </Button>*/}
        <HikeGrid/>
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