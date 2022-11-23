import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";

function AddHutForm() {
    const [form, setForm]=useState(false);
    const [error, setError]=useState(false); 
    const [success, setSuccess]=useState(false);
    return (
        <Container>
            {!form && <ActiveForm setForm={setForm} setError={setError} setSuccess={setSuccess}/>}
            {form && error && <ErrorDisplay setError={setError} setForm={setForm}/>}
            {form && success && <SuccessDisplay setSuccess={setSuccess} setForm={setForm}/>}
        </Container>
    );
}

function ActiveForm(props){
    
    const [title, setTitle] = useState("");
    const [latitude, setLatitude]=useState(""); 
    const [longitude, setLongitude]=useState("");
    const [country, setCountry]=useState(""); 
    const [province, setProvince]=useState(""); 
    const [town, setTown]=useState(""); 
    const [altitude, setAltitude]=useState(""); 
    const [beds, setBeds]=useState(0);
    const [food, setFood]=useState("none"); 
    const [description, setDescription] = useState("");

    //----- TO DO -----
    const addHut = async (title, latitude, longitude, country, province, town, altitude, beds, food, description) => {
        try {
            let params=JSON.stringify({title:title, latitude:latitude, longitude:longitude, country:country, province:province, town:town, altitude:altitude, beds:beds, food:food, description:description})
            console.log("params:"+params);
            let res= API.addHut(params);
            return res;

        } catch (err) {
            console.log(err);
            return false;
        }

    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        props.setForm(true);
        let result = await addHut(title, latitude, longitude, country, province, town, altitude, beds, food, description);
        if(result !== false){
            props.setSuccess(true);
        }
        else{
            props.setError(true); 
        }

    };

    return(
            <Form onSubmit={handlerSubmit} className="hike-form">
            <div className="hike-form-group">
                <Row>
                    <div className="form-group mt-3">
                        <Form.Group controlId='hutTitle'>
                            <Form.Label><b>Title</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required
                                onChange={ev => {setTitle(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <Row>
                <Col>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutLatitude">
                            <Form.Label><b>Latitude</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter latitude" required
                                onChange={ev => {setLatitude(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                </Col>
                <Col>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutLongitude">
                            <Form.Label><b>Longitude</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter Longitude" required
                                onChange={ev => {setLongitude(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                </Col>
                </Row>
                <Row>
                <Col>
                <div className="form-group mt-3">
                    <Form.Group controlId='hutCountry'>
                        <Form.Label><b>Country</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter country" required
                            onChange={ev => {setCountry(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                </Col>
                <Col>
                <div className="form-group mt-3">
                    <Form.Group controlId='hutProvince'>
                        <Form.Label><b>Province</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter province" required
                            onChange={ev => {setProvince(ev.target.value); }}
                        />
                    </Form.Group>
                </div>  
                </Col>
                </Row>   
                <Row>  
                <Col>         
                <div className="form-group mt-3">
                    <Form.Group controlId='hutTown'>
                        <Form.Label><b>Town</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter town" required
                            onChange={ev => {setTown(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                </Col>
                <Col>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutAltitude">
                            <Form.Label><b>Altitude</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter Altitude" required
                                onChange={ev => {setAltitude(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                </Col>
                </Row>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hutBeds">
                        <Form.Label><b>N. Beds</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="number" placeholder="Enter n. beds" required
                            onChange={ev => {setBeds(ev.target.value); }}
                        />
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hutFood">
                        <Form.Label><b>Food supply</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Select required onChange={ev => {setFood(ev.target.value); }}>
                            <option value="None">None</option>
                            <option value="Buffet">Buffet</option>
                            <option value="Restaurant">Restaurant</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="form-group mt-3">
                    <Form.Group className="mb-3" controlId="hutDescription">
                        <Form.Label><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control as="textarea" rows={2}
                            onChange={ev => {setDescription(ev.target.value); }}
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

  function ErrorDisplay(props){

    return(
        <div className="display-container">
                <p className="text-center">There was an error trying to send your request. Please try again.</p>
                <div className="d-grid gap-2 mt-1">
                    <Button type="submit" className="guideBtn" borderless="true" onClick={() => {props.setError(false); props.setForm(false);}}>RETRY</Button>
                </div>
        </div>
    );
  }

  function SuccessDisplay(props){
    const navigate = useNavigate();

    return(
        <div className="display-container">
                <p className="text-center">Your submission has been sent successfully!</p>
                <div className="d-grid gap-2 mt-1">
                    <Nav.Link onClick={() => {navigate('/');props.setSuccess(false); props.setForm(false); }} style={{ color: "black" }} active>CLOSE</Nav.Link>
                </div>
        </div>
    );

  }

export { AddHutForm };