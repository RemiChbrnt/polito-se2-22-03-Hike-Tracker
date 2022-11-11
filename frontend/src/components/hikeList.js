import { Card, Row, Col, ListGroup, Container } from 'react-bootstrap';

function HikeGrid(props) {

  //Dummy array for beginning
  let hikes = [
    {
      "title": "Sentiero per il Rocciamelone",
      "length": 9.0,
      "expTime": 6.5,
      "ascent": 1353.0,
      "difficulty": "pro",
      "startPt": 1,
      "endPt": 2,
      "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
    },
    {
      "title": "Sentiero del Bosco",
      "length": 9.0,
      "expTime": 6.5,
      "ascent": 1353.0,
      "difficulty": "pro",
      "startPt": 1,
      "endPt": 2,
      "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
    },
    {
      "title": "Sentiero della Motagna",
      "length": 9.0,
      "expTime": 6.5,
      "ascent": 1353.0,
      "difficulty": "pro",
      "startPt": 1,
      "endPt": 2,
      "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
    }
  ]

  return (
    <Container fluid>
      <Row xs={1} md={2} className="g-4">
        {
          hikes.map(hike => <HikeCard hike={hike} key={hike.title} />)
        }
      </Row>
      <ul></ul>
    </Container>
  );
}

function HikeCard(props) {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title><h3 className="fw-bold">{props.hike.title}</h3></Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item><span className="fw-bold">Length: </span>{props.hike.length}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Estimated Time: </span>{props.hike.expTime}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Ascent: </span>{props.hike.ascent}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Difficulty: </span>{props.hike.difficulty}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Start Point: </span>{props.hike.startPt}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">End Point: </span>{props.hike.endPt}</ListGroup.Item>
            <ListGroup.Item>{props.hike.description}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}

export { HikeGrid };