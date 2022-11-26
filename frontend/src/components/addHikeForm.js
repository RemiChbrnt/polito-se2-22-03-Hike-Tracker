import { Form, Button, Container, Row, Col, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toGeoJson from '@mapbox/togeojson'
import { DOMParser } from 'xmldom'

import API from "../API";

// API call to push a hike to the database
const handleHikeCreation = async (title, length, expTime, ascent, difficulty, startPt, endPt, description, track, author) => {
    try {
        let body = {
            title: title,
            length: length,
            expTime: expTime,
            ascent: ascent,
            difficulty: difficulty,
            startPt: startPt,
            endPt: endPt,
            description: description,
            track: track,
            author: author
        }
        let res = await API.createHike(body);
        return res;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// API call to push a location to the database (for Start and End points if needed)
const handleLocationCreation = async (name, type, latitude, longitude, country, province, town, address, altitude) => {
    // Setting null parameters for undefined inputs (that are not mandatory)
    if (country === "") country = null;
    if (province === "") province = null;
    if (town === "") town = null;
    if (address === "") address = null;
    if (altitude === "") altitude = null;

    try {
        let body = {
            name: name,
            type: type,
            latitude: latitude,
            longitude: longitude,
            country: country,
            province: province,
            town: town,
            address: address,
            altitude: altitude
        }
        let res = await API.createLocation(body);
        return (res.id);
    } catch (err) {
        console.log(err);
        return (false);
    }
};


function AddHikeForm(props) {

    const navigate = useNavigate();

    //  Hike form params
    const [title, setTitle] = useState("");
    const [length, setLength] = useState("");
    const [expTime, setExpTime] = useState("");
    const [ascent, setAscent] = useState("");
    const [difficulty, setDifficulty] = useState('tourist');
    const [description, setDescription] = useState("");
    const [gpxFile, setGPXFile] = useState(null);
    const [invalidFileFormat, setInvalidFileFormat] = useState(false);

    // Start point form params
    const [startPtName, setStartPtName] = useState(null);
    const [startPtType, setStartPtType] = useState('generic');
    const [startPtLatitude, setStartPtLatitude] = useState("");
    const [startPtLongitude, setStartPtLongitude] = useState("");
    const [startPtCountry, setStartPtCountry] = useState("");
    const [startPtProvince, setStartPtProvince] = useState("");
    const [startPtTown, setStartPtTown] = useState("");
    const [startPtAddress, setStartPtAddress] = useState("");
    const [startPtAltitude, setStartPtAltitude] = useState("");

    // End point form params
    const [endPtName, setEndPtName] = useState(null);
    const [endPtType, setEndPtType] = useState('generic');
    const [endPtLatitude, setEndPtLatitude] = useState("");
    const [endPtLongitude, setEndPtLongitude] = useState("");
    const [endPtCountry, setEndPtCountry] = useState("");
    const [endPtProvince, setEndPtProvince] = useState("");
    const [endPtTown, setEndPtTown] = useState("");
    const [endPtAddress, setEndPtAddress] = useState("");
    const [endPtAltitude, setEndPtAltitude] = useState("");


    // Start and End point selection
    const [openStart, setOpenStart] = useState(false);
    const [startPoint, setStartPoint] = useState();

    const [openEnd, setOpenEnd] = useState(false);
    const [endPoint, setEndPoint] = useState();

    const [locationList, setLocationList] = useState([]);

    const handlerSubmit = async (e) => {
        e.preventDefault();

        let startPtIndex = startPoint;
        let endPtIndex = endPoint;

        console.log("startPtIndex " + startPtIndex);
        console.log("endPtIndex " + endPtIndex);

        if (startPtIndex === undefined) {
            startPtIndex = await handleLocationCreation(
                startPtName, startPtType, startPtLatitude, startPtLongitude, startPtCountry, startPtProvince, startPtTown, startPtAddress, startPtAltitude
            );
        }
        if (endPtIndex === undefined) {
            endPtIndex = await handleLocationCreation(
                endPtName, endPtType, endPtLatitude, endPtLongitude, endPtCountry, endPtProvince, endPtTown, endPtAddress, endPtAltitude
            );
        }
        if (startPtIndex !== false && endPtIndex !== false) {
            console.log("points");
            console.log(endPtIndex);
            console.log(startPtIndex);
        }

        let res = handleHikeCreation(title,
            length,
            expTime,
            ascent,
            difficulty,
            startPtIndex,
            endPtIndex,
            description,
            gpxFile,
            props.user.email
        );

        navigate("/");

    };

    // Set address from coordinates if possible
    const setAddressFromCoordinates = (coords, isStart) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords[1]}&lon=${coords[0]}&format=json`)
            .then(res => res.json())
            .then(res => {
                // START POINT
                if (isStart) {
                    if (res.lat !== undefined) setStartPtLatitude(parseFloat(res.lat));
                    if (res.lon !== undefined) setStartPtLongitude(parseFloat(res.lon));
                    if (res.address.country !== undefined) setStartPtCountry(res.address.country);
                    if (res.address.county !== undefined) setStartPtProvince(res.address.county);
                    if (res.display_name !== undefined) setStartPtAddress(res.display_name);

                    if (res.address.city !== undefined) {
                        setStartPtTown(res.address.city);
                    } else {
                        if (res.address.village !== undefined) setStartPtTown(res.address.village);
                    }
                    // END POINT
                } else {
                    if (res.lat !== undefined) setEndPtLatitude(parseFloat(res.lat));
                    if (res.lon !== undefined) setEndPtLongitude(parseFloat(res.lon));
                    if (res.address.country !== undefined) setEndPtCountry(res.address.country);
                    if (res.address.county !== undefined) setEndPtProvince(res.address.county);
                    if (res.display_name !== undefined) setEndPtAddress(res.display_name);

                    if (res.address.city !== undefined) {
                        setEndPtTown(res.address.city);
                    } else {
                        if (res.address.village !== undefined) setEndPtTown(res.address.village);
                    }
                }
            });
    }


    const handleFile = (ev) => {
        let file = ev.target.files[0];
        // Checking correct file format
        if (file.name.slice(-4) !== ".gpx") {
            setInvalidFileFormat(true);
        } else {
            setInvalidFileFormat(false);
            let reader = new FileReader();
            reader.readAsText(file);
            // We stringify the GPX, then execute the following
            reader.onloadend = () => {
                // Conversion to GeoJSON format
                var gpx = new DOMParser().parseFromString(reader.result);
                var converted = toGeoJson.gpx(gpx);

                // Stringifying GeoJSON file for the database
                setGPXFile(JSON.stringify(converted));

                // Extracting Start and End Point coordinates in order to automatically fill the address fields
                var startPointCoordinates = converted.features[0].geometry.coordinates[0];
                var endPointCoordinates = converted.features[0].geometry.coordinates[converted.features[0].geometry.coordinates.length - 1];
                setAddressFromCoordinates(startPointCoordinates, true);
                setAddressFromCoordinates(endPointCoordinates, false);
            }
        }
    }


    return (
        <Container style={{ flex: 1 }}>
            <Row>
                <Col>
                    <h1>Add new hike</h1>
                </Col>
                <Col>
                <ul></ul>
                    <Row>
                        <b> Upload a GPX Track for the hike </b>
                    </Row>
                    <Row>
                        <input type="file" name="file" onChange={ev => handleFile(ev)} />
                        {invalidFileFormat && <h5 style={{ color: "#f00" }}>WARNING : Invalid format, try with a .gpx </h5>}
                    </Row>
                </Col>
            </Row>
            <ul></ul>

            <Row>
                <Form onSubmit={handlerSubmit} className="hike-form mt-3">
                    <Col className="form-group">
                        <Form.Label><b>Hike Title</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control type="text" placeholder="Enter title" required
                            onChange={ev => { setTitle(ev.target.value); }}
                        />

                    </Col>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label><b>Length</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter length" required
                                onChange={ev => { setLength(ev.target.value); }}
                            />
                        </Col>
                        <Col>
                            <Form.Label><b>Expected Time</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter expected time" required
                                onChange={ev => { setExpTime(ev.target.value); }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label><b>Ascent</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter ascent" required
                                onChange={ev => { setAscent(ev.target.value); }}
                            />
                        </Col>
                        <Col>
                            <Form.Label><b>Difficulty</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Select required onChange={ev => { setDifficulty(ev.target.value); }}>
                                <option value="tourist">Tourist</option>
                                <option value="hiker">Hiker</option>
                                <option value="pro">Professional Hiker</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeDescription">
                            <Form.Label><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control as="textarea" rows={2}
                                onChange={ev => { setDescription(ev.target.value); }}
                            />
                        </Form.Group>
                    </Row>
                    <ul></ul>

                    <Row className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeStartPt">
                            <Form.Label><b>Start Point</b></Form.Label>
                            <Row>
                                <Col>
                                    <Button onClick={() => { setOpenStart(!openStart); setStartPoint(); API.getHutsAndParkingLots().then(locations => { setLocationList(locations) }).catch(error => console.log(error)); }}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openStart} variant="success" size="sm">
                                        {!openStart ?
                                            <h5 className="text-white"> Choose the Start Point from existing points</h5>
                                            :
                                            <h5 className="text-white"> Insert a new point as the Start Point</h5>
                                        }
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Collapse in={openStart}>
                                    <Form.Group>
                                        <Form.Select value={startPoint}
                                            onChange={e => setStartPoint(e.target.value)}
                                            aria-label="region" size="lg">
                                            <option value={undefined}>Select the Start Point</option>
                                            {locationList.map((location, index) => <option value={location.id} key={index}>{location.name}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Collapse>
                            </Row>
                            {!openStart && <div>
                                <Row>
                                    <Col>
                                        <Form.Label>Name<b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="text" placeholder="Enter start point name" required
                                            onChange={ev => { setStartPtName(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Type<b className="asterisk-required">*</b></Form.Label>
                                        <Form.Select required onChange={ev => { setStartPtType(ev.target.value); }}>
                                            <option>generic</option>
                                            <option>parkinglot</option>
                                            <option>hut</option>
                                        </Form.Select>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Latitude<b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="number" placeholder={startPtLatitude} required
                                            value={startPtLatitude}
                                            onChange={ev => { setStartPtLatitude(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Longitude <b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="number" placeholder={startPtLongitude} required
                                            value={startPtLongitude}
                                            onChange={ev => { setStartPtLongitude(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Altitude</Form.Label>
                                        <Form.Control type="number" placeholder="Enter altitude"
                                            onChange={ev => { setStartPtAltitude(ev.target.value); }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder={startPtAddress}
                                            value={startPtAddress}
                                            onChange={ev => { setStartPtAddress(ev.target.value); }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Town/Hamlet/Village</Form.Label>
                                        <Form.Control type="text" placeholder={startPtTown}
                                            value={startPtTown}
                                            onChange={ev => { setStartPtTown(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Province</Form.Label>
                                        <Form.Control type="text" placeholder={startPtProvince}
                                            value={startPtProvince}
                                            onChange={ev => { setStartPtProvince(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" placeholder={startPtCountry}
                                            value={startPtCountry}
                                            onChange={ev => { setStartPtCountry(ev.target.value); }}
                                        />
                                    </Col>
                                </Row>
                            </div>}
                        </Form.Group>
                    </Row>
                    <ul></ul>
                    <Row className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hikeEndPt">
                            <Form.Label><b>End Point</b></Form.Label>
                            <Row>
                                <Col>
                                    <Button onClick={() => { setOpenEnd(!openEnd); setEndPoint(); API.getHutsAndParkingLots().then(locations => { setLocationList(locations) }).catch(error => console.log(error)); }}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openEnd} variant="success" size="sm">
                                        {!openStart ?
                                            <h5 className="text-white"> Choose the End Point from existing points</h5>
                                            :
                                            <h5 className="text-white"> Insert a new point as the End Point</h5>
                                        }
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Collapse in={openEnd}>
                                    <Form.Group>
                                        <Form.Select value={endPoint}
                                            onChange={e => setEndPoint(e.target.value)}
                                            aria-label="region" size="lg">
                                            <option value={undefined}>Select the Arrival Point</option>
                                            {locationList.map((location, index) => <option value={location.id} key={index}>{location.name}</option>)}
                                        </Form.Select>
                                    </Form.Group>
                                </Collapse>
                            </Row>
                            {!openEnd && <div>
                                <Row>
                                    <Col>
                                        <Form.Label>Name<b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="text" placeholder="Enter start point name" required
                                            onChange={ev => { setEndPtName(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Type<b className="asterisk-required">*</b></Form.Label>
                                        <Form.Select required onChange={ev => { setEndPtType(ev.target.value); }}>
                                            <option>generic</option>
                                            <option>parkinglot</option>
                                            <option>hut</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Latitude<b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="number" placeholder={endPtLatitude} required
                                            value={endPtLatitude}
                                            onChange={ev => { setEndPtLatitude(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Longitude <b className="asterisk-required">*</b></Form.Label>
                                        <Form.Control type="number" placeholder={endPtLongitude} required
                                            value={endPtLongitude}
                                            onChange={ev => { setEndPtLongitude(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Altitude</Form.Label>
                                        <Form.Control type="number" placeholder="Enter altitude"
                                            onChange={ev => { setEndPtAltitude(ev.target.value); }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder={endPtAddress}
                                            value={endPtAddress}
                                            onChange={ev => { setEndPtAddress(ev.target.value); }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Town/Hamlet/Village</Form.Label>
                                        <Form.Control type="text" placeholder={endPtTown}
                                            value={endPtTown}
                                            onChange={ev => { setEndPtTown(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Province</Form.Label>
                                        <Form.Control type="text" placeholder={endPtProvince}
                                            value={endPtProvince}
                                            onChange={ev => { setEndPtProvince(ev.target.value); }}
                                        />
                                    </Col>
                                    <Col className="form-group mt-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" placeholder={endPtCountry}
                                            value={endPtCountry}
                                            onChange={ev => { setEndPtCountry(ev.target.value); }}
                                        />
                                    </Col>
                                </Row>
                            </div>}
                        </Form.Group>
                    </Row>
                    <ul></ul>
                    <Row className="d-grid gap-2 mt-3">
                        <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                    </Row>
                    <ul></ul>
                </Form>
                <ul></ul>
            </Row>
            <ul></ul>
        </Container>
    );
}

export { AddHikeForm };