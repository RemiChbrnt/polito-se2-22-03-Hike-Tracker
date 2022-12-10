import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";


//----- TO DO -----
const addPoint = async (type, name, latitude, longitude, country, region, town, address, altitude) => {
    try {
        // API.createPoint(type, name, latitude, longitude, country, region, town, address, altitude);
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }

};


//----- TO DO -----
function AddPointForm(type) {


    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [altitude, setAltitude] = useState("");


    const handlerSubmit = async (e) => {
        e.preventDefault();

        let result = await addPoint(type, name, latitude, longitude, country, region, town, address, altitude);
        // if(result !== false)
        //     ...
        // else
        //     ...


    };


    return (
        <Form onSubmit={handlerSubmit} className="hike-form">
            <div className="hike-form-group">
                <div className="form-group mt-3">
                    <Form.Group controlId='hutName'>
                        <Form.Label><b>Name</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter hut name" required
                            onChange={ev => { setName(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hutLatitude">
                        <Form.Label><b>Latitude</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter latitude" required
                            onChange={ev => { setLatitude(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hutLongitude">
                        <Form.Label><b>Longitude</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter longitude" required
                            onChange={ev => { setLongitude(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label><b>Country</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter country" required
                            onChange={ev => { setCountry(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="region">
                        <Form.Label><b>region</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter region" required
                            onChange={ev => { setRegion(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="town">
                        <Form.Label><b>Town</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter town" required
                            onChange={ev => { setTown(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label><b>Address</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter address" required
                            onChange={ev => { setAddress(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="altitude">
                        <Form.Label><b>Altitude</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter altitude" required
                            onChange={ev => { setAltitude(ev.target.value); }}
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

export { AddPointForm };