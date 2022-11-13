import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";




//----- TO DO -----
function AddHikeForm() {

    const [title, setTitle] = useState("");
    const [length, setLength] = useState("");
    const [expTime, setExpTime] = useState("");
    const [ascent, setAscent] = useState("");
    const [difficulty, setDifficulty] = useState('Tourist');
    const [startPt, setStartPt] = useState('Rocciamelone');
    const [endPt, setEndPt] = useState('Rocciamelone');
    const [description, setDescription] = useState("");



    //----- TO DO -----
    const addHike = async (title, length, expTime, ascent, difficulty, startPt, endPt, description) => {
        try {
            // API.createHut(params);
            return true;

        } catch (err) {
            console.log(err);
            return false;
        }

    };

    const handlerSubmit = async (e) => {
        e.preventDefault();

        let result = await addHike(title, length, expTime, ascent, difficulty, startPt, endPt, description);
        // if(result !== false)
        //     ...
        // else
        //     ...


    };


    return (
        <Form onSubmit={handlerSubmit} className="hike-form">
            <div className="hike-form-group">
                <div className="form-group mt-3">
                    <Form.Group controlId='hikeTitle'>
                        <Form.Label><b>Title</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter title" required
                            onChange={ev => { setTitle(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hikeLength">
                        <Form.Label><b>Length</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter length" required
                            onChange={ev => { setLength(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hikeExpTime">
                        <Form.Label><b>Expected Time</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter expected time" required
                            onChange={ev => { setExpTime(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hikeAscent">
                        <Form.Label><b>Ascent</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter ascent" required
                            onChange={ev => { setAscent(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hikeDifficulty">
                        <Form.Label><b>Difficulty</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Select required onChange={ev => { setDifficulty(ev.target.value); }}>
                            <option value="Tourist">Tourist</option>
                            <option value="Hiker">Hiker</option>
                            <option value="Pro">Professional Hiker</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hikeDescription">
                        <Form.Label><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control as="textarea" rows={2}
                            onChange={ev => { setDescription(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hikeStartPt">
                        <Form.Label><b>Start Point</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Select required onChange={ev => { setStartPt(ev.target.value); }}>
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
    );
}

export { AddHikeForm };