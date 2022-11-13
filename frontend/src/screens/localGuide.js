import React, {useState} from "react";
import { Col, Container, Button, Row, Form} from 'react-bootstrap';

const LocalGuide = ({setProps}) => {

  const [form, setForm] = useState(false);
  const [difficulty, setDifficulty] = useState('Tourist');
  const [startPt, setStartPt]=useState('Rocciamelone');
  const [endPt, setEndPt]=useState('Rocciamelone');
  const handleCreate = (event) => {
    event.preventDefault();

  };

  return (
    <Container>
      {!form && 
        <Button className="guideBtn" size="lg" borderless="true" onClick={() => setForm(true)}>ADD HIKE</Button>
      }
      {form && 
        <Container>
                <Form onSubmit={handleCreate} className="hike-form">
                <div className="hike-form-group">
                    <div className="form-group mt-3">
                        <Form.Group controlId='hikeTitle'>
                            <Form.Label><b>Title</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required />
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeLength">
                            <Form.Label><b>Length</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter length" required/>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeExpTime">
                            <Form.Label><b>Expected Time</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter expected time" required/>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeAscent">
                            <Form.Label><b>Ascent</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter ascent" required/>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeDifficulty">
                            <Form.Label><b>Difficulty</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Select required>
                                <option>Tourist</option>
                                <option>Hiker</option>
                                <option>Professional Hiker</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeDescription">
                            <Form.Label><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control as="textarea" rows={2} />
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeStartPt">
                            <Form.Label><b>Start Point</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Select required>
                                <option>Select start point</option>
                                <option>Rifugio La Riposa</option>
                                <option>Rocciamelone</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeEndPt">
                            <Form.Label><b>End Point</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Select required>
                                <option>Select end point</option>
                                <option>Rifugio La Riposa</option>
                                <option>Rocciamelone</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                    </div>
                </div>
                </Form>
        </Container>
      }
    </Container>
  );
}

export default LocalGuide;