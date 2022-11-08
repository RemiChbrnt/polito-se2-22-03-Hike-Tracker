import { Card, Row, Col } from 'react-bootstrap';

function HikeGrid(props) {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Hike Title</Card.Title>
              <Card.Text>
                Information of the Hike
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export { HikeGrid };