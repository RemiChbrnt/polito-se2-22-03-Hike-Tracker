import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import API from "../API";

function AddHikeCoverForm(props) {
    const [form, setForm] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const params = useParams();

    return (
        <Container>
            {!form && <ActiveForm hikeId={params.hikeId} user={props.user} setForm={setForm} setError={setError} setSuccess={setSuccess} />}
            {form && error && <ErrorDisplay setError={setError} setForm={setForm} />}
            {form && success && <SuccessDisplay setSuccess={setSuccess} setForm={setForm} />}
        </Container>
    );
}

function ActiveForm(props) {

    const [photoPreview, setPhotoPreview] = useState(null);
    const [invalidFileFormat, setInvalidFileFormat] = useState(false);
    const [formData, setFormData] = useState("");

    const handleFile = (e) => {
        let file = e.target.files[0];
        // Checking correct file format
        if (file.name.slice(-4) !== ".png" && file.name.slice(-5) !== ".jpeg" && file.name.slice(-4) !== ".jpg") {
            setInvalidFileFormat(true);
        } else {
            setInvalidFileFormat(false);
            setPhotoPreview(file);

            let formData = new FormData();

            formData.append("file", file);
            setFormData(formData);
        }
    }



    const addHikePhoto = async (hikeId) => {
        try {
            let res = await API.addHikePhoto(hikeId, formData);
            return res;

        } catch (err) {
            console.log(err);
            return false;
        }

    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        props.setForm(true);
        let result = await addHikePhoto(props.hikeId);
        if (result !== false)
            props.setSuccess(true);
        else
            props.setError(true);

    };

    return (
        <Container>
            <ul></ul>
            <Row className="text-center"><h2> Add a photo for your hike </h2></Row>
            <ul></ul>
            <Form onSubmit={handlerSubmit} className="link-form" encType="multipart/form-data">
                <div className="hike-form-group">
                    <Row>
                        <Form.Label>Upload a PNG, JPG or JPEG file</Form.Label>
                        <Form.Control id="file" type="file" onChange={ev => handleFile(ev)} />

                        {invalidFileFormat && <h5 style={{ color: "#f00" }}>WARNING : Invalid format, try with a .png or a .jpeg </h5>}
                    </Row>
                    <Row>
                        {(photoPreview !== null) && <img src={URL.createObjectURL(photoPreview)} />}
                    </Row>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="guideBtn" borderless="true" disabled={invalidFileFormat}>CONFIRM</Button>
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

export { AddHikeCoverForm };