import { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

function HutFilterForm(props) {

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [minAltitude, setMinAltitude] = useState();
    const [maxAltitude, setMaxAltitude] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.setShow(false);
        let filters = [];
        if (name !== "") {
            filters.push({ key: "name", value: name.toLocaleLowerCase() });
        }
        if (latitude !== "") {
            filters.push({ key: "latitude", value: latitude.toLocaleLowerCase() });
        }
        if (longitude !== "") {
            filters.push({ key: "longitude", value: latitude.toLocaleLowerCase() });
        }
        if (country !== "") {
            filters.push({ key: "country", value: country.toLocaleLowerCase() });
        }
        if (province !== "") {
            filters.push({ key: "province", value: province.toLocaleLowerCase() });
        }
        if (town !== "") {
            filters.push({ key: "town", value: town.toLocaleLowerCase() });
        }
        if (address !== "") {
            filters.push({ key: "address", value: address.toLocaleLowerCase() });
        }
        if (maxAltitude !== undefined) {
            filters.push({ key: "altitude", value: maxAltitude });
        }
        if (minAltitude !== undefined) {
            filters.push({ key: "altitude", value: minAltitude });
        }

        props.setFilters(JSON.stringify(filters));
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group>
                        <h5>Name: </h5>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type='text' placeholder="Name" size="lg" />
                    </Form.Group>
                </Row>
                <ul></ul>

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

                <Row>
                    <Form.Group>
                        <h5>Country: </h5>
                        <Form.Control
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            type='text' placeholder="Country" size="lg" />
                    </Form.Group>
                </Row>
                <ul></ul>

                <Row>
                    <Form.Group>
                        <Form.Select value={province}
                            onChange={e => setProvince(e.target.value)}
                            aria-label="region" size="lg">
                            <option>Select the Province</option>
                            <option value="Abruzzo">Abruzzo</option>
                            <option value="Basilicata">Basilicata</option>
                            <option value="Calabria">Calabria</option>
                            <option value="Campania">Campania</option>
                            <option value="Emilia Romagna">Emilia Romagna</option>
                            <option value="Friuli Venezia Giulia">Friuli Venezia Giulia</option>
                            <option value="Lazio">Lazio</option>
                            <option value="Liguria">Liguria</option>
                            <option value="Lombardia">Lombardia</option>
                            <option value="Marche">Marche</option>
                            <option value="Molise">Molise</option>
                            <option value="Piemonte">Piemonte</option>
                            <option value="Puglia">Puglia</option>
                            <option value="Sardegna">Sardegna</option>
                            <option value="Sicilia">Sicilia</option>
                            <option value="Toscana">Toscana</option>
                            <option value="Trentino Alto">Trentino Alto</option>
                            <option value="Umbria">Umbria</option>
                            <option value="Valle d'Aosta">Valle d'Aosta</option>
                            <option value="Veneto">Veneto</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <ul></ul>

                <Row>
                    <Form.Group>
                        <h5>Town: </h5>
                        <Form.Control
                            value={town}
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
            </Form>
        </Container>
    );
}

export { HutFilterForm };