import { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Country, State, City } from 'country-state-city';

function HutFilterForm(props) {

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [minAltitude, setMinAltitude] = useState("");
    const [maxAltitude, setMaxAltitude] = useState("");
    const [minNumberOfBeds, setMinNumberOfBeds] = useState("");
    const [maxNumberOfBeds, setMaxNumberOfBeds] = useState("");
    const [minCost, setMinCost] = useState("");
    const [maxCost, setMaxCost] = useState("");
    const [food, setFood] = useState("");

    const [location, setLocation] = useState("address");

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.setShow(false);
        let filters = [];

        if (name !== "") filters.push({ key: "name", value: name.toLocaleLowerCase() });
        if (minCost !== "") filters.push({ key: "cost", value: minCost });
        if (maxCost !== "") filters.push({ key: "cost", value: maxCost });
        if (food !== "") filters.push({ key: "food", value: food });
        if (latitude !== "") filters.push({ key: "latitude", value: latitude.toLocaleLowerCase() });
        if (longitude !== "") filters.push({ key: "longitude", value: latitude.toLocaleLowerCase() });
        if (country !== "") filters.push({ key: "country", value: country.name.toLocaleLowerCase() });
        if (region !== "") filters.push({ key: "region", value: region });
        if (town !== "") filters.push({ key: "town", value: town.toLocaleLowerCase() });
        if (address !== "") filters.push({ key: "address", value: address.toLocaleLowerCase() });
        if (maxAltitude !== "") filters.push({ key: "maxAltitude", value: maxAltitude });
        if (minAltitude !== "") filters.push({ key: "minAltitude", value: minAltitude });
        if (minNumberOfBeds !== "") filters.push({ key: "minNumberOfBeds", value: minNumberOfBeds });
        if (maxNumberOfBeds !== "") filters.push({ key: "maxNumberOfBeds", value: maxNumberOfBeds });

        props.setFilters(JSON.stringify(filters));
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group>
                        <h5 id='name-label'>Name: </h5>
                        <Form.Control
                            id='name-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type='text' placeholder="Name" size="lg" />
                    </Form.Group>
                </Row>
                <ul></ul>

                <Row>
                    <h5>Select location searching: </h5>
                    <Col>
                        <Form.Check
                            inline
                            label="Address"
                            name="group1"
                            type='radio'
                            id='radio'
                            defaultChecked={true}
                            onClick={() => setLocation("address")}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            inline
                            label="Coordinates"
                            name="group1"
                            type='radio'
                            id='radio'
                            onClick={() => setLocation("coordinates")}
                        />
                    </Col>
                </Row>
                {location === "address" ?
                    <>
                        <Row>
                            <Form.Group>
                                <h5>Country: </h5>
                                <Form.Select
                                    onChange={e => {
                                        if (e.target.value === "")
                                            setCountry("");
                                        else
                                            setCountry(JSON.parse(e.target.value));
                                    }}
                                    aria-label="region" size="lg">
                                    <option value="">Select the Country</option>
                                    {Country.getAllCountries().map((r, k) => {
                                        return <option key={k} value={JSON.stringify(r)}>{r.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <ul></ul>
                        <Row>
                            <Form.Group>
                                <h5>Region: </h5>
                                <Form.Select
                                    onChange={e => setRegion(e.target.value)}
                                    aria-label="region" size="lg"
                                    disabled={country === ""}>
                                    <option value="">Select the Region</option>
                                    {State.getStatesOfCountry(country.isoCode).map((r, k) => {
                                        //this package returns also the provinces for Italy, but the regions are identified by a number
                                        //in order to not return the provinces too this check is necessary
                                        if (country.isoCode === "IT" && isNaN(r.isoCode))
                                            return;

                                        return <option key={k} value={r.name}>{r.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <ul></ul>
                        <Row>
                            <Form.Group>
                                <h5>Town: </h5>
                                <Form.Control value={town}
                                    onChange={e => setTown(e.target.value)}
                                    type='text' placeholder="Town" size="lg" />
                            </Form.Group>
                        </Row>
                        <ul></ul>
                        <Row>
                            <Form.Group>
                                <h5>Address: </h5>
                                <Form.Control
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    type='text' placeholder="Address" size="lg" />
                            </Form.Group>
                        </Row>
                        <ul></ul>
                    </>
                    :
                    location === "coordinates" ?
                        <>
                            <Row>
                                <Form.Group>
                                    <h5>Latitude: </h5>
                                    <Form.Control
                                        value={latitude}
                                        onChange={e => setLatitude(e.target.value)}
                                        type='text' placeholder="Latitude" size="lg" />
                                </Form.Group>
                            </Row>
                            <ul></ul>

                            <Row>
                                <Form.Group>
                                    <h5>Longitude: </h5>
                                    <Form.Control
                                        value={longitude}
                                        onChange={e => setLongitude(e.target.value)}
                                        type='text' placeholder="Longitude" size="lg" />
                                </Form.Group>
                            </Row>
                            <ul></ul>
                        </>
                        :
                        false
                }
                <ul></ul>
                <Row>
                    <Col>
                        <Form.Group>
                            <h5>Minimum Cost (€): </h5>
                            <Form.Control
                                value={minCost}
                                onChange={e => setMinCost(e.target.value)}
                                type='number' placeholder="MinimumCost" size="lg" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <h5>Maximum Cost (€): </h5>
                            <Form.Control
                                value={maxCost}
                                onChange={e => setMaxCost(e.target.value)}
                                type='number' placeholder="MaximumCost" size="lg" />
                        </Form.Group>
                    </Col>
                </Row>
                <ul></ul>
                <Row>
                    <Col>
                        <Form.Group>
                            <h5>Minimum Altitude (m): </h5>
                            <Form.Control
                                value={minAltitude}
                                onChange={e => setMinAltitude(e.target.value)}
                                type='number' placeholder="Minimum Altitude" size="lg" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <h5>Maximum Altitude (m): </h5>
                            <Form.Control
                                value={maxAltitude}
                                onChange={e => setMaxAltitude(e.target.value)}
                                type='number' placeholder="Maximum Altitude" size="lg" />
                        </Form.Group>
                    </Col>
                </Row>
                <ul></ul>
                <Row>
                    <Form.Group>
                        <h5>Food: </h5>
                        <Form.Select value={food}
                            onChange={e => setFood(e.target.value)}
                            aria-label="food" size="lg">
                            <option>Select food type</option>
                            <option value="buffet">Buffet</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="none">None</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <ul></ul>
                <Row>
                    <Col>
                        <Form.Group>
                            <h5>Number of beds:</h5>
                            <Form.Control
                                onChange={e => setMinNumberOfBeds(e.target.value)}
                                min={0}
                                max={250}
                                type='number' placeholder="Minimum Number Of Beds" size="lg" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <h5>Number of beds:</h5>
                            <Form.Control
                                onChange={e => setMaxNumberOfBeds(e.target.value)}
                                min={0}
                                max={250}
                                type='number' placeholder="Maximum Number Of Beds" size="lg" />
                        </Form.Group>
                    </Col>
                </Row>
                <ul></ul>
                <Row>
                    <Col>
                        <Button variant="danger" onClick={() => props.setShow(false)} size="lg">
                            Back
                        </Button>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button variant="success" type="submit" size="lg">
                            Confirm
                        </Button>
                    </Col>
                </Row>
                <ul></ul>
            </Form>
        </Container>
    );
}

export { HutFilterForm };