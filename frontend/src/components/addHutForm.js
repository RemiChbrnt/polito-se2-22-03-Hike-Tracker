import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { Country, State, City }  from 'country-state-city';
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
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode]=useState("");
    const [region, setRegion] = useState("");
    const [regionCode, setRegionCode]=useState(""); 
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [altitude, setAltitude] = useState("");
    const [numberOfBeds, setNumberOfBeds] = useState(0);
    const [food, setFood] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    //----- TO DO -----
    const addHut = async (name, latitude, longitude, country, region, town, address, altitude, numberOfBeds, food, description, phone, email, website) => {
        try {
            let params = ({ name: name, type: "hut", latitude: latitude, longitude: longitude, country: country, region: region, town: town, address: address, altitude: altitude, numberOfBeds: numberOfBeds, food: food, description: description, phone:phone, email:email, website:website})
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
        <Container>
            <h2>Add a New Hut !</h2>
            <Form onSubmit={handlerSubmit} className="hike-form">
                <div className="hike-form-group">
                    <Row>
                        <div className="form-group mt-3">
                            <Form.Group controlId='hutName'>
                                <Form.Label><b>Name</b> <b className="asterisk-required">*</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" required
                                    onChange={ev => { setName(ev.target.value); }}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group mt-3">
                                <Form.Group className="mb-3" controlId="hutLatitude">
                                    <Form.Label><b>Latitude</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter latitude"
                                        onChange={ev => { setLatitude(ev.target.value); }}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group mt-3">
                                <Form.Group className="mb-3" controlId="hutLongitude">
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
                                <Form.Group controlId='hutCountry'>
                                    <Form.Label><b>Country</b></Form.Label>
                                        <Form.Select className='country-input' value={countryCode} onChange={(ev) => { 
                                            if(ev.target.value!==''){
                                                setCountryCode(ev.target.value);
                                                setCountry(Country.getAllCountries().filter(c => c.isoCode === ev.target.value)[0].name);
                                            }
                                        }}>
                                            <option key={'None'} value={''}>{'Select a country'}</option>
                                            {Country.getAllCountries().map((c, i) => <option key={i} value={c.isoCode}>{c.name}</option>)}
                                        </Form.Select>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group mt-3">
                                <Form.Group controlId='hutRegion'>
                                    <Form.Label><b>Region</b></Form.Label>
                                    <Form.Select className='region-input' value={regionCode} disabled={countryCode ? false : true} style={{ cursor: "pointer" }} onChange={ev => { 
                                        if(ev.target.value!==''){
                                            setRegionCode(ev.target.value);
                                            setRegion(State.getStatesOfCountry(countryCode).filter(r=>r.isoCode===ev.target.value)[0].name);
                                        }
                                        
                                    }}>
                                        <option key={'None'} value={''}>{'Select a region'}</option>
                                        {State.getStatesOfCountry(countryCode).map((r, k) => <option key={k} value={r.isoCode}>{r.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group mt-3">
                                <Form.Group controlId='hutTown'>
                                    <Form.Label><b>Town</b></Form.Label>
                                    <Form.Select className='town-input' disabled={regionCode ? false : true} style={{ cursor: "pointer" }} onChange={ev => {setTown(ev.target.value);}}>
                                        <option key={'None'} value={''}>{'Select a town'}</option>
                                        {City.getCitiesOfState(countryCode, regionCode).map((t,m)=><option key={m} value={t.name}>{t.name}</option>)}
                                    </Form.Select>
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
                        <Row>
                            <Col>
                                <div className="form-group mt-3">
                                    <Form.Group className="mb-3" controlId="hutAltitude">
                                        <Form.Label><b>Altitude</b> <b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="number"  min={0} placeholder="Enter Altitude" required
                                            onChange={ev => { setAltitude(ev.target.value); }}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group mt-3">
                                <Form.Group controlId='hutPhone'>
                                    <Form.Label><b>Phone</b><b className="asterisk-required">*</b></Form.Label>
                                    <Form.Control className='phone-input' pattern="[0-9]{4,12}" value ={phone} type='tel' placeholder="Enter phone" required
                                        onChange={ev => { setPhone(ev.target.value); }}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group mt-3">
                                <Form.Group controlId='hutEmail'>
                                    <Form.Label><b>Email</b><b className="asterisk-required">*</b></Form.Label>
                                    <Form.Control className='email-input' type='email' value={email} placeholder="Enter email" required
                                        onChange={ev => { setEmail(ev.target.value); }}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutBeds">
                            <Form.Label><b>N. Beds</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter n. beds" required
                                onChange={ev => { setNumberOfBeds(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutFood">
                            <Form.Label><b>Food supply</b></Form.Label>
                            <Form.Select onChange={ev => { setFood(ev.target.value); }}>
                                <option value="none">None</option>
                                <option value="buffet">Buffet</option>
                                <option value="restaurant">Restaurant</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutDescription">
                            <Form.Label><b>Description</b><b className="asterisk-required">*</b></Form.Label>
                            <Form.Control as="textarea" rows={2} required
                                onChange={ev => { setDescription(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutWebsite">
                            <Form.Label><b>Website</b></Form.Label>
                            <Form.Control className='website-input' type='url' placeholder="https://example.com" value={website}
                                        onChange={ev => { setWebsite(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
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

export { AddHutForm };