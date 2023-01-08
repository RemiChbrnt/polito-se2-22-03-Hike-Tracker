import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City }  from 'country-state-city';

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
    const [countryCode, setCountryCode]=useState("");
    const [region, setRegion] = useState("");
    const [regionCode, setRegionCode]=useState(""); 
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [altitude, setAltitude] = useState("");
    const [description, setDescription] = useState("");
    const [lotsNumber, setLotsNumber] = useState(0);
 
    const addParking = async (title, latitude, longitude, country, region, town, address, altitude, description, lotsNumber) => {
        try {
            let params = ({ name: title, type: "parkinglot", latitude: latitude, longitude: longitude, country: country, region: region, town: town, address: address, altitude: altitude, description: description, lotsNumber: lotsNumber });
            let res = await API.createLocation(params);
            return res;

        } catch (err) {
            console.log(err);
            return false;
        }

    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        props.setForm(true);
        let result = await addParking(title, latitude, longitude, country, region, town, address, altitude, description, lotsNumber);
        if (result !== false) {
            props.setSuccess(true);
        }
        else {
            props.setError(true);
        }

    };

    return (
        <Container>
            <Row><h2 id='add-parking-title'>Add a new Parking Lot !</h2></Row>
            <Row className="hike-form">
                <Form onSubmit={handlerSubmit} className="mt-3">
                    <Col className="form-group">
                        <Form.Label id='title-label'><b>Title</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='title-control' type="text" placeholder="Enter title" required
                            onChange={ev => { setTitle(ev.target.value); }}
                        />
                    </Col>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label id='latitude-label'><b>Latitude</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='latitude-control' type="text" placeholder="Enter latitude" required
                                onChange={ev => { setLatitude(ev.target.value); }}
                            />
                        </Col>
                        <Col>
                               
                            <Form.Label id='longitude-label'><b>Longitude</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='longitude-control' type="text" placeholder="Enter Longitude" required
                                onChange={ev => { setLongitude(ev.target.value); }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label id='country-label'><b>Country</b></Form.Label>
                                <Form.Select id='country-select' className='country-input' value={countryCode} onChange={(ev) => { 
                                    if(ev.target.value!==''){
                                        setCountryCode(ev.target.value);
                                        setCountry(Country.getAllCountries().filter(c => c.isoCode === ev.target.value)[0].name);
                                    }
                                }}>
                                    <option key={'None'} value={''}>{'Select a country'}</option>
                                    {Country.getAllCountries().map((c, i) => <option key={i} value={c.isoCode}>{c.name}</option>)}
                                </Form.Select>
                        </Col>
                        <Col>
                                
                            <Form.Label id='region-label'><b>Region</b></Form.Label>
                            <Form.Select id='region-select' className='region-input' value={regionCode} disabled={countryCode ? false : true} style={{ cursor: "pointer" }} onChange={ev => { 
                                if(ev.target.value!==''){
                                    setRegionCode(ev.target.value);
                                    setRegion(State.getStatesOfCountry(countryCode).filter(r=>r.isoCode===ev.target.value)[0].name);
                                }
                                
                            }}>
                                <option key={'None'} value={''}>{'Select a region'}</option>
                                {State.getStatesOfCountry(countryCode).map((r, k) => <option key={k} value={r.isoCode}>{r.name}</option>)}
                            </Form.Select>
                                  
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Col>
                               
                            <Form.Label id='town-label'><b>Town</b></Form.Label>
                            <Form.Select id='town-select' className='town-input' disabled={regionCode ? false : true} style={{ cursor: "pointer" }} onChange={ev => {setTown(ev.target.value);}}>
                                <option key={'None'} value={''}>{'Select a town'}</option>
                                {City.getCitiesOfState(countryCode, regionCode).map((t,m)=><option key={m} value={t.name}>{t.name}</option>)}
                            </Form.Select>
                        </Col>
                        <Col>
                                
                            <Form.Label id='address-label'><b>Address</b></Form.Label>
                            <Form.Control id='address-control' type="text" placeholder="Enter an address"
                                onChange={ev => { setAddress(ev.target.value); }}
                            />
                        </Col>
                    </Row>
                    <Col className="form-group mt-3">
                        <Form.Label id='altitude-label'><b>Altitude</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='altitude-control' type="number" placeholder="Enter Altitude" required
                            onChange={ev => { setAltitude(ev.target.value); }}
                        />
                    </Col>
                    <Col className="form-group mt-3">
                        <Form.Label id='number-of-lots-label'><b>N. Lots</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='number-of-lots-control' type="number" placeholder="Enter number of lots"
                            onChange={ev => { setLotsNumber(ev.target.value); }}
                        />
                    </Col>
                    <Col className="form-group mt-3">
                        <Form.Label id='description-label' ><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='description-control' as="textarea" rows={2}
                            onChange={ev => { setDescription(ev.target.value); }}
                        />
                    </Col>
                    <Col className="d-grid gap-2 mt-3">
                        <Button id='confirm-button' type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                    </Col>
                </Form>
            </Row>
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

export { AddParkingForm };