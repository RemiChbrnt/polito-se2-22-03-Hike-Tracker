import { Card, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HikeGrid(props) {

  //Dummy array for beginning
  let hikes = [
    {
      "id": "A2eh89DL3PAcliu",
      "title": "Sentiero per il Rocciamelone",
      "length": 9.0,
      "expTime": 6.5,
      "ascent": 1353.0,
      "difficulty": "pro",
      "startPt": [45.079300, 7.675558],
      "endPt": [45.056300, 7.715558],
      "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
    },
    {
      "id": "acp093HAakjh33",
      "title": "Sentiero del Bosco",
      "length": 9.0,
      "expTime": 6.5,
      "ascent": 1353.0,
      "difficulty": "pro",
      "startPt": [45.079300, 7.675558],
      "endPt": [45.056300, 7.715558],
      "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
    },
    {
      "id": "32Wpoj2d0z5FJh",
      "title": "Sentiero della Motagna",
      "length": 9.0,
      "expTime": 6.5,
      "ascent": 1353.0,
      "difficulty": "pro",
      "startPt": [45.079300, 7.675558],
      "endPt": [45.056300, 7.715558],
      "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti)."
    },
  ]

  return (
    <Container fluid>
      <Row xs={1} md={2} className="g-4">
        {
          hikes.map(hike => <HikeCard hike={hike} key={hike.title} setProps={props.setProps}/>)
        }
      </Row>
      <ul></ul>
    </Container>
  );
}

function HikeCard(props) {
  const navigate = useNavigate();

  const showDetail = (() => {
    props.setProps({
      hikeTitle: props.hike.title,
      hikeDifficulty: props.hike.difficulty, 
      hikeLength: props.hike.length,
      hikeExpTime: props.hike.expTime,
      hikeAscent: props.hike.ascent,
      hikeDescription: props.hike.description,
      hikeStartPt: props.hike.startPt,
      hikeEndPt: props.hike.endPt
    });
    navigate("/hike-detail-"+props.hike.id);
  });

  return (
    <Col>
      <Card style={{cursor: "pointer"}} onClick={() => {showDetail()}}>
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