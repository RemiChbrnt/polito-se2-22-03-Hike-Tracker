import React, { useState, useEffect } from "react";
import { Col, Container, Button, Row, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { HikeGrid } from "./../components/hikeList";
import {HikeFilterForm} from "./../components/hikeFilterForm";

function Home({setProps}) {

  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState("");

  const navigate = useNavigate();

  return (
    <Container>
      <ul></ul>
      <Row>
        <Col md={10}>
        <h1>Hike List</h1>
        </Col>
        <Col md={2}>
          <Button onClick={() => setShow(true)} variant="light" size="lg"><i className="bi bi-sliders"></i>{" "}Filter</Button>
        </Col>
      </Row>      
      <ul></ul>
      <Row>
        {/*<Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/hiker') }}>
          <h3 className="text-white">Hiker</h3>
        </Button>*/}
        <HikeGrid setProps={setProps}/>
      </Row>

      <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Filter Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HikeFilterForm setShow={setShow} setFilters={setFilters}/>
        </Modal.Body>
      </Modal>

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