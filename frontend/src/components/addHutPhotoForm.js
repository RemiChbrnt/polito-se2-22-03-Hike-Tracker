import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { resolvePath, useNavigate } from 'react-router-dom';

import API from "../API";
import toGeoJSON from '@mapbox/togeojson';

function AddHutPhotoForm() {
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

    const [id, setId] = useState(6);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const [invalidFileFormat, setInvalidFileFormat] = useState(false);


    const handleFile = (e) => {
        let file = e.target.files[0];
        // Checking correct file format
        if (file.name.slice(-4) !== ".png" && file.name.slice(-5) !== ".jpeg") {
            setInvalidFileFormat(true);
        } else {
            setInvalidFileFormat(false);
            console.log("file " + file);
            setPhotoPreview(file);
            // setPhoto(file);

            let reader = new FileReader();

            reader.onloadend = (e) => {
                console.log("photo " + photo);

                setPhoto(e.target.result);
                console.log("photo " + e.target.result);

            }
            reader.readAsDataURL(file);

        }
    }



    const addHutPhoto = async (id, photo) => {
        try {
            let body = ({ id: id, photo: photo })
            let res = API.addHutPhoto(body);
            return res;

        } catch (err) {
            console.log(err);
            return false;
        }

    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        props.setForm(true);
        let result = await addHutPhoto(id, photo);
        if (result !== false)
            props.setSuccess(true);

        else
            props.setError(true);

    };

    return (
        <Container>
            <h2> Add a photo for your hut </h2>
            <Form onSubmit={handlerSubmit} className="hike-form">
                <div className="hike-form-group">
                    <Row>
                        <div className="form-group mt-3">
                            <Form.Group controlId='hutName'>
                                <Form.Label><b>Id</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" required
                                    onChange={ev => { setId(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <b> Upload a PNG or JPEG file </b>
                    </Row>
                    <Row>
                        <input type="file" name="file" onChange={ev => handleFile(ev)} />
                        {invalidFileFormat && <h5 style={{ color: "#f00" }}>WARNING : Invalid format, try with a .png or a .jpeg </h5>}
                    </Row>
                    <Row>
                        {(photoPreview !== null) && <img src={URL.createObjectURL(photoPreview)} />}
                    </Row>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                    </div>
                </div>
            </Form>
        </Container>
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

export { AddHutPhotoForm };