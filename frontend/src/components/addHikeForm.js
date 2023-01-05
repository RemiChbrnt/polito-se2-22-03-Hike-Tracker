import { Form, Button, Container, Row, Col, Collapse } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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
const handleLocationCreation = async (name, type, latitude, longitude, country, region, town, address, altitude) => {
    // Setting null parameters for undefined inputs (that are not mandatory)
    if (country === "") country = null;
    if (region === "") region = null;
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
            region: region,
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
    const [startPtregion, setStartPtregion] = useState("");
    const [startPtTown, setStartPtTown] = useState("");
    const [startPtAddress, setStartPtAddress] = useState("");
    const [startPtAltitude, setStartPtAltitude] = useState("");

    // End point form params
    const [endPtName, setEndPtName] = useState(null);
    const [endPtType, setEndPtType] = useState('generic');
    const [endPtLatitude, setEndPtLatitude] = useState("");
    const [endPtLongitude, setEndPtLongitude] = useState("");
    const [endPtCountry, setEndPtCountry] = useState("");
    const [endPtregion, setEndPtregion] = useState("");
    const [endPtTown, setEndPtTown] = useState("");
    const [endPtAddress, setEndPtAddress] = useState("");
    const [endPtAltitude, setEndPtAltitude] = useState("");


    // Start and End point selection
    const [openStart, setOpenStart] = useState(true);
    const [startMatchingLocations, setStartMatchingLocations] = useState([]);
    const [startPoint, setStartPoint] = useState();

    const [openEnd, setOpenEnd] = useState(true);
    const [endMatchingLocations, setEndMatchingLocations] = useState([]);
    const [endPoint, setEndPoint] = useState();

    const [identicalEndStart, setIdenticalEndStart] = useState(false);

    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        API.getLocations().then(locations => { setLocationList(locations) }).catch(error => console.log(error));
    }, [])


    const handlerSubmit = async (e) => {
        e.preventDefault();

        let startPtIndex = startPoint;
        let endPtIndex = endPoint;

        if (startPtIndex === undefined) {
            startPtIndex = await handleLocationCreation(
                startPtName, startPtType, startPtLatitude, startPtLongitude, startPtCountry, startPtregion, startPtTown, startPtAddress, startPtAltitude
            );
        }
        if (identicalEndStart && startPtIndex !== undefined) {
            endPtIndex = startPtIndex;
        } else if (endPtIndex === undefined) {
            endPtIndex = await handleLocationCreation(
                endPtName, endPtType, endPtLatitude, endPtLongitude, endPtCountry, endPtregion, endPtTown, endPtAddress, endPtAltitude
            );
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
                    if (res.address.county !== undefined) setStartPtregion(res.address.county);
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
                    if (res.address.county !== undefined) setEndPtregion(res.address.county);
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
                let gpx = new DOMParser().parseFromString(reader.result);
                let converted = toGeoJson.gpx(gpx);

                // Stringifying GeoJSON file for the database
                setGPXFile(JSON.stringify(converted));

                // Extracting Start and End Point coordinates in order to automatically fill the address fields
                let startPointCoordinates = converted.features[0].geometry.coordinates[0];
                let endPointCoordinates = converted.features[0].geometry.coordinates[converted.features[0].geometry.coordinates.length - 1];
                setAddressFromCoordinates(startPointCoordinates, true);
                setAddressFromCoordinates(endPointCoordinates, false);
                const matchStart = findMatchingLocation(startPointCoordinates);
                const matchEnd = findMatchingLocation(endPointCoordinates);
                setEndMatchingLocations(matchEnd);
                setStartMatchingLocations(matchStart);
            }
        }
    }

    // A function that will search within the existing locations if one could match coordinates
    const findMatchingLocation = (coords) => {
        let matchingLocations = [];
        // Checking if a location exists close to the given
        if (Array.isArray(locationList) && Array.isArray(coords)) {
            const minLat = coords[1] - 0.001;
            const maxLat = coords[1] + 0.001;
            const minLon = coords[0] - 0.001;
            const maxLon = coords[0] + 0.001;


            for (let i = 0; i < locationList.length; i++) {
                // Checking all lat/long constraints
                if ((locationList[i].latitude > minLat) && (locationList[i].latitude < maxLat) && (locationList[i].longitude > minLon) && (locationList[i].longitude < maxLon)) {
                    matchingLocations.push(i);
                }
            }
        }
        return matchingLocations;
    }


    return (
        <Container style={{ flex: 1 }}>
            <Row>
                <Row>
                    <h1 id='add-new-hike-title'>Add new hike</h1>
                </Row>
                <ul></ul>
                <Row>
                    <b id='upload-gpx-title'> Upload a GPX Track for the hike </b>
                </Row>
                <Row>
                    <input id='upload-gpx-button' type="file" name="file" onChange={ev => handleFile(ev)} />
                    {invalidFileFormat && <h5 style={{ color: "#f00" }}>WARNING : Invalid format, try with a .gpx </h5>}
                </Row>
            </Row>
            <ul></ul>

            <Row className="hike-form">
                <Form onSubmit={handlerSubmit} className="mt-3">
                    <Col className="form-group">
                        <Form.Label id='hike-title-label'><b>Hike Title</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Control id='hike-title-control' type="text" placeholder="Enter title" required
                            onChange={ev => { setTitle(ev.target.value); }}
                        />

                    </Col>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label id='length-label'><b>Length (km)</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='length-control' type="number" placeholder="Enter length" required
                                onChange={ev => { setLength(ev.target.value); }}
                            />
                        </Col>
                        <Col>
                            <Form.Label id='expected-time-label'><b>Expected Time (hours)</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='expected-time-control' type="number" placeholder="Enter expected time" required
                                onChange={ev => { setExpTime(ev.target.value); }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Col>
                            <Form.Label id='ascent-label'><b>Ascent (m)</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='ascent-control' type="number" placeholder="Enter ascent" required
                                onChange={ev => { setAscent(ev.target.value); }}
                            />
                        </Col>
                        <Col>
                            <Form.Label id='difficulty-label'><b>Difficulty</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Select id='difficulty-select' required onChange={ev => { setDifficulty(ev.target.value); }}>
                                <option value="tourist">Tourist</option>
                                <option value="hiker">Hiker</option>
                                <option value="pro">Professional Hiker</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label id='description-label'><b>Description</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control id='description-control' as="textarea" rows={2}
                                onChange={ev => { setDescription(ev.target.value); }}
                            />
                        </Form.Group>
                    </Row>
                    <ul></ul>

                    <Row className="form-group mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label id='start-point-label'><b>Start Point</b></Form.Label>
                            {// If a corresponding location already exists
                                (startMatchingLocations.length !== 0) ?
                                    <Container>
                                        <h6> Matching Location(s) found for the given GPX file :</h6>
                                        <Form.Group>
                                            <Form.Select
                                                value={startPoint}
                                                onChange={e => setStartPoint(e.target.value)}
                                                aria-label="region" size="md">
                                                <option value={undefined}>Select the Start Point</option>
                                                {locationList.map((location, index) => {
                                                    return startMatchingLocations.includes(index) &&
                                                        <option value={location.id} key={location.id}>{location.name}     | Address : {location.address}</option>
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Col>
                                            <Button onClick={() => setStartMatchingLocations([])}
                                                size="sm"
                                                style={{ marginTop: 15, flex: 1, fontSize: 13, fontWeight: "bold", color: "#C70039", backgroundColor: "white", borderColor: "#C70039" }}>
                                                Create a new Point anyway
                                            </Button>
                                        </Col>
                                    </Container>
                                    :
                                    <>
                                        <Row>
                                            <Col>
                                                <Button onClick={() => setOpenStart(true)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={openStart} variant="success" size="sm"
                                                    style={!openStart ? { flex: 1, fontSize: 15, fontWeight: "bold", color: "#00706c", backgroundColor: "white" } :
                                                        { flex: 1, fontSize: 15, fontWeight: "bold", color: "white", backgroundColor: "#00706c" }}>
                                                    Choose the Start Point from existing points
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button onClick={() => setOpenStart(false)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={openStart} variant="success" size="sm"
                                                    style={openStart ? { flex: 1, fontSize: 15, fontWeight: "bold", color: "#00706c", backgroundColor: "white" } :
                                                        { flex: 1, fontSize: 15, fontWeight: "bold", color: "white", backgroundColor: "#00706c" }}>
                                                    Insert a new point as the Start Point
                                                </Button>
                                            </Col>
                                            <Col />
                                        </Row>
                                        {openStart && <Row className="hike-form-group">
                                            <Collapse in={openStart}>
                                                <Form.Group>
                                                    <Form.Select
                                                        id='start-point-select'
                                                        value={startPoint}
                                                        onChange={e => setStartPoint(e.target.value)}
                                                        aria-label="region" size="md">
                                                        <option value={undefined}>Select the Start Point</option>
                                                        {locationList.map((location, index) => <option value={location.id} key={location.id}>{location.name}</option>)}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Collapse>
                                        </Row>}
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
                                                        <option value="generic">Generic</option>
                                                        <option value="parkinglot">Parking Lot</option>
                                                        <option value="hut">Hut</option>
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
                                                    <Form.Label>region</Form.Label>
                                                    <Form.Control type="text" placeholder={startPtregion}
                                                        value={startPtregion}
                                                        onChange={ev => { setStartPtregion(ev.target.value); }}
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
                                    </>}
                        </Form.Group>
                    </Row>
                    <ul></ul>
                    <Row className="form-group mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label id='end-point-label'><b>End Point</b></Form.Label>
                            <Button onClick={() => { setIdenticalEndStart(!identicalEndStart) }}
                                size="sm"
                                style={identicalEndStart ? { marginLeft: 30, fontSize: 13, fontWeight: "bold", color: "white", backgroundColor: "#00706c", borderColor: "#00706c" }
                                    : { marginLeft: 30, fontSize: 13, color: "#C70039", backgroundColor: "white", borderColor: "#C70039" }}>
                                {identicalEndStart ? "Identical Start and End points ?   ☑" : "Identical Start and End points ?   ☐"}
                            </Button>
                            {// If a corresponding location already exists and the start and end points are different
                                !identicalEndStart &&
                                ((endMatchingLocations.length !== 0) ?
                                    <Container>
                                        <h6> Matching Location(s) found for the given GPX file :</h6>
                                        <Form.Group>
                                            <Form.Select
                                                value={endPoint}
                                                onChange={e => setEndPoint(e.target.value)}
                                                aria-label="region" size="md">
                                                <option value={undefined}>Select the End Point</option>
                                                {locationList.map((location, index) => {
                                                    return endMatchingLocations.includes(index) &&
                                                        <option value={location.id} key={location.id}>{location.name}     | Address : {location.address}</option>
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Col>
                                            <Button onClick={() => setStartMatchingLocations([])}
                                                size="sm"
                                                style={{ marginTop: 15, flex: 1, fontSize: 13, fontWeight: "bold", color: "#C70039", backgroundColor: "white", borderColor: "#C70039" }}>
                                                Create a new Point anyway
                                            </Button>
                                        </Col>
                                    </Container>
                                    :
                                    <>
                                        <Row>
                                            <Col>
                                                <Button onClick={() => setOpenEnd(true)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={openEnd} variant="success" size="sm"
                                                    style={!openEnd ? { flex: 1, fontSize: 15, fontWeight: "bold", color: "#00706c", backgroundColor: "white" } :
                                                        { flex: 1, fontSize: 15, fontWeight: "bold", color: "white", backgroundColor: "#00706c" }}>
                                                    Choose the End Point from existing points
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button onClick={() => setOpenEnd(false)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={openEnd} variant="success" size="sm"
                                                    style={openEnd ? { flex: 1, fontSize: 15, fontWeight: "bold", color: "#00706c", backgroundColor: "white" } :
                                                        { flex: 1, fontSize: 15, fontWeight: "bold", color: "white", backgroundColor: "#00706c" }}>
                                                    Insert a new point as the End Point
                                                </Button>
                                            </Col>
                                            <Col />
                                        </Row>
                                        {openEnd && <Row className="hike-form-group">
                                            <Collapse in={openEnd}>
                                                <Form.Group>
                                                    <Form.Select
                                                        id='end-point-select'
                                                        value={endPoint}
                                                        onChange={e => setEndPoint(e.target.value)}
                                                        aria-label="region" size="md">
                                                        <option value={undefined}>Select the Arrival Point</option>
                                                        {locationList.map((location, index) => <option value={location.id} key={location.id}>{location.name}</option>)}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Collapse>
                                        </Row>}
                                        {!openEnd && <div>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Name<b className="asterisk-required">*</b></Form.Label>
                                                    <Form.Control type="text" placeholder="Enter end point name" required
                                                        onChange={ev => { setEndPtName(ev.target.value); }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label>Type<b className="asterisk-required">*</b></Form.Label>
                                                    <Form.Select required onChange={ev => { setEndPtType(ev.target.value); }}>
                                                        <option value="generic">Generic</option>
                                                        <option value="parkinglot">Parking Lot</option>
                                                        <option value="hut">Hut</option>
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
                                                    <Form.Label>region</Form.Label>
                                                    <Form.Control type="text" placeholder={endPtregion}
                                                        value={endPtregion}
                                                        onChange={ev => { setEndPtregion(ev.target.value); }}
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
                                    </>)}
                        </Form.Group>
                    </Row>
                    <ul></ul>
                    <Row className="d-grid gap-2 mt-3">
                        <Button id='confirm-button' type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
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