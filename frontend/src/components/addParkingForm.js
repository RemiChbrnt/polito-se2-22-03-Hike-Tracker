import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";

function AddParkingForm() {
    const [form, setForm] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    return (
        <Container>
            {!form && <ActiveForm setForm={setForm} setError={setError} setSuccess={setSuccess} />}
            {form && error && <ErrorDisplay setError={setError} setForm={setForm} />}
            {form && success && <SuccessDisplay setSuccess={setSuccess} setForm={setForm} />}
        </Container>
    );
}

function ActiveForm(props) {

    const [title, setTitle] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [altitude, setAltitude] = useState("");
    const [description, setDescription] = useState("");
    const [lotsNumber, setLotsNumber] = useState(0);
    //----- TO DO -----
    const addParking = async (title, latitude, longitude, country, province, town, address, altitude, description, lotsNumber) => {
        try {
            let params = ({ name: title, type: "parkinglot", latitude: latitude, longitude: longitude, country: country, province: province, town: town, address: address, altitude: altitude, description: description, lotsNumber: lotsNumber });
            let res = API.createLocation(params);
            return res;

        } catch (err) {
            console.log(err);
            return false;
        }

    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        props.setForm(true);
        let result = await addParking(title, latitude, longitude, country, province, town, address, altitude, description, lotsNumber);
        if (result !== false) {
            props.setSuccess(true);
        }
        else {
            props.setError(true);
        }

    };

    return (
        <Form onSubmit={handlerSubmit} className="hike-form">
            <div className="hike-form-group">
                <Row>
                    <div className="form-group mt-3">
                        <Form.Group controlId='parkingTitle'>
                            <Form.Label><b>Title</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required
                                onChange={ev => { setTitle(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group mt-3">
                            <Form.Group className="mb-3" controlId="parkingLatitude">
                                <Form.Label><b>Latitude</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter latitude" required
                                    onChange={ev => { setLatitude(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group mt-3">
                            <Form.Group className="mb-3" controlId="parkingLongitude">
                                <Form.Label><b>Longitude</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Longitude" required
                                    onChange={ev => { setLongitude(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group mt-3">
                            <Form.Group controlId='parkingCountry'>
                                <Form.Label><b>Country</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter country" required
                                    onChange={ev => { setCountry(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group mt-3">
                            <Form.Group controlId='parkingProvince'>
                                <Form.Label><b>Province</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter province" required
                                    onChange={ev => { setProvince(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group mt-3">
                            <Form.Group controlId='parkingTown'>
                                <Form.Label><b>Town</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter town" required
                                    onChange={ev => { setTown(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group mt-3">
                            <Form.Group controlId='parkingAddress'>
                                <Form.Label><b>Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter town"
                                    onChange={ev => { setAddress(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="parkingAltitude">
                        <Form.Label><b>Altitude</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter Altitude" required
                            onChange={ev => { setAltitude(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="lotsNumber">
                        <Form.Label><b>N. Lots</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter number of lots"
                            onChange={ev => { setLotsNumber(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="parkingDescription">
                        <Form.Label><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control as="textarea" rows={2}
                            onChange={ev => { setDescription(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="d-grid gap-2 mt-3">
                    <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                </div>
            </div>
        </Form>
    );
}

function ErrorDisplay(props) {

    return (
        <div className="display-container">
            <p className="text-center">There was an error trying to send your request. Please try again.</p>
            <div className="d-grid gap-2 mt-1">
                <Button type="submit" className="guideBtn" borderless="true" onClick={() => { props.setError(false); props.setForm(false); }}>RETRY</Button>
            </div>
        </div>
    );
}

function SuccessDisplay(props) {
    const navigate = useNavigate();

    return (
        <div className="display-container">
            <p className="text-center">Your submission has been sent successfully!</p>
            <div className="d-grid gap-2 mt-1">
                <Button type="submit" className="guideBtn" borderless="true"><Nav.Link onClick={() => { navigate('/'); props.setSuccess(false); props.setForm(false); }} style={{ color: "white" }} active>CLOSE</Nav.Link></Button>
            </div>
        </div>
    );

}

export { AddParkingForm };