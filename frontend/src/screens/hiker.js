import {useState, useEffect} from "react";
import { Col, Container, Row, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const Hiker = ({setProps}) => {

  const navigate = useNavigate();

  const [customerRequest, setCustomerRequest] = useState(false);

  return (
    <Container fluid>
      <ul></ul>
      <Row>
        <Col md={10}>
          <h1>Client</h1>
        </Col>
        <Col md={2}>
          <div className="d-grid gap-2">
            <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate('/') }}><h4 className="text-white"> Home</h4></Button>
          </div>
        </Col>
      </Row>
      <ul></ul>
    </Container>

  );
}

export default Hiker;