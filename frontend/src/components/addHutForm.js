import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { Country, State, City } from 'country-state-city';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";

function AddHutForm() {
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

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [country, setCountry] = useState(undefined);
    const [countryCode, setCountryCode] = useState("");
    const [region, setRegion] = useState(undefined);
    const [regionCode, setRegionCode] = useState("");
    const [town, setTown] = useState(undefined);
    const [address, setAddress] = useState("");
    const [altitude, setAltitude] = useState("");
    const [numberOfBeds, setNumberOfBeds] = useState(0);
    const [food, setFood] = useState("none");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState(undefined);
    //----- TO DO -----
    const addHut = async (name, latitude, longitude, country, region, town, address, altitude, numberOfBeds, food, description, phone, email, website) => {
        try {
            let params = ({ name: name, type: "hut", latitude: latitude, longitude: longitude, country: country, region: region, town: town, address: address, altitude: altitude, numberOfBeds: numberOfBeds, food: food, description: description, phone: phone, email: email, website: website })
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
        let result = await addHut(name, latitude, longitude, country, region, town, address, altitude, numberOfBeds, food, description, phone, email, website);
        if (result !== false) {
            props.setSuccess(true);
        }
        else {
            props.setError(true);
        }

    };

    return (
        <Container style={{ flex: 1 }}>
            <Row><h2 id='add-hut-title'>Add a New Hut !</h2></Row>
            <Row className="hike-form">
                <Form onSubmit={handlerSubmit} className="mt-3">
                    <Col className="form-group">
                        <Form.Label id='name-label'><b>Name</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='name-control' type="text" placeholder="Enter name" required
                            onChange={ev => { setName(ev.target.value); }}
                        />
                    </Col>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label id='latitude-label'><b>Latitude</b> <b className="asterisk-required">*</b> </Form.Label>
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
                                if (ev.target.value !== '') {
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
                                if (ev.target.value !== '') {
                                    setRegionCode(ev.target.value);
                                    setRegion(State.getStatesOfCountry(countryCode).filter(r => r.isoCode === ev.target.value)[0].name);
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
                            <Form.Select id='town-select' className='town-input' disabled={regionCode ? false : true} style={{ cursor: "pointer" }} onChange={ev => { setTown(ev.target.value); }}>
                                <option key={'None'} value={''}>{'Select a town'}</option>
                                {City.getCitiesOfState(countryCode, regionCode).map((t, m) => <option key={m} value={t.name}>{t.name}</option>)}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label id='address-label'><b>Address</b></Form.Label>
                            <Form.Control id='address-control' type="text" placeholder="Enter town"
                                onChange={ev => { setAddress(ev.target.value); }}
                            />
                        </Col>
                        <Row className="form-group mt-3">
                            <Col>
                                <Form.Label id='altitude-label'><b>Altitude</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control id='altitude-control' type="number" min={0} placeholder="Enter Altitude" required
                                    onChange={ev => { setAltitude(ev.target.value); }}
                                />
                            </Col>
                        </Row>
                    </Row>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label id='phone-number-label'><b>Phone number</b><b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='phone-number-control' className='phone-input' pattern="[0-9]{4,12}" value={phone} type='tel' placeholder="Enter phone" required
                                onChange={ev => { setPhone(ev.target.value); }}
                            />
                        </Col>
                        <Col>
                            <Form.Label id='email-laber'><b>Email</b><b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='email-control'className='email-input' type='email' value={email} placeholder="Enter email" required
                                onChange={ev => { setEmail(ev.target.value); }}
                            />
                        </Col>
                    </Row>
                    <Col className="form-group mt-3">
                        <Form.Label id='number-of-beds-label'><b>Number of beds</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='number-of-beds-control' type="number" placeholder="Enter n. beds" required
                            onChange={ev => { setNumberOfBeds(ev.target.value); }}
                        />
                    </Col>
                    <Col className="form-group mt-3">
                        <Form.Label id='food-supply-label'><b>Food supply</b></Form.Label>
                        <Form.Select id='food-supply-select' onChange={ev => { setFood(ev.target.value); }}>
                            <option value="none">None</option>
                            <option value="buffet">Buffet</option>
                            <option value="restaurant">Restaurant</option>
                        </Form.Select>
                    </Col>
                    <Col className="form-group mt-3">
                        <Form.Label id='description-label'><b>Description</b><b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='description-control' as="textarea" rows={2} required
                            onChange={ev => { setDescription(ev.target.value); }}
                        />
                    </Col>
                    <Col className="form-group mt-3">
                        <Form.Label id='website-label'><b>Website</b></Form.Label>
                        <Form.Control id='website-control' className='website-input' type='url' placeholder="https://example.com" value={website}
                            onChange={ev => { setWebsite(ev.target.value); }}
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

export { AddHutForm };