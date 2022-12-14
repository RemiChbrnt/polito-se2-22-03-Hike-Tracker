import { useState, useEffect } from 'react';
import { Form, Row, Col, ListGroup, Container, Button } from 'react-bootstrap';
import { HikeFilterMap } from './hikeFilterMap';
import { Country, State, City } from 'country-state-city';

function HikeFilterForm(props) {

    const [filterFromMap, setFilterFromMap] = useState(false);

    const [difficulty, setDifficulty] = useState("");
    const [region, setRegion] = useState("");
    const [minLength, setMinLength] = useState();
    const [maxLength, setMaxLength] = useState();
    const [minAscent, setMinAscent] = useState();
    const [maxAscent, setMaxAscent] = useState();
    const [minTime, setMinTime] = useState();
    const [maxTime, setMaxTime] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.setShow(false);
        let filters = [];
        if (difficulty != "") {
            filters.push({ key: "difficulty", value: difficulty.toLocaleLowerCase() });
        }
        if (region != "") {
            filters.push({ key: "region", value: region.toLocaleLowerCase() });
        }
        if (minLength != undefined) {
            filters.push({ key: "minLength", value: minLength });
        }
        if (maxLength != undefined) {
            filters.push({ key: "maxLength", value: maxLength });
        }
        if (minAscent != undefined) {
            filters.push({ key: "minAscent", value: minAscent });
        }
        if (maxAscent != undefined) {
            filters.push({ key: "maxAscent", value: maxAscent });
        }
        if (minTime != undefined) {
            filters.push({ key: "minTime", value: minTime });
        }
        if (maxTime != undefined) {
            filters.push({ key: "maxTime", value: maxTime });
        }

        props.setFilters(JSON.stringify(filters));
    }

    return (
        <Container>
            {filterFromMap ?
                <Button id='specific-filter-button' className="mb-2" onClick={() => setFilterFromMap(!filterFromMap)} variant="light" size="lg">
                    <i className="bi bi-sliders"></i>{"  Specific Filters"}
                </Button>
                :
                <Button id='filter-on-map-button' className="mb-2" onClick={() => setFilterFromMap(!filterFromMap)} variant="light" size="lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe-americas" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                    </svg>
                    {"   Filter On Map"}
                </Button>
            }
            {
                filterFromMap ?
                    <Container>
                        <HikeFilterMap setCoords={props.setCoords} setRadiusFilter={props.setRadiusFilter} setShow={props.setShow} />
                    </Container>
                    : <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group>
                                <Form.Select id='difficulty-select' value={difficulty}
                                    onChange={e => setDifficulty(e.target.value)}
                                    aria-label="difficulty" size="lg">
                                    <option>Select the Difficulty</option>
                                    <option value="Tourist">Tourist</option>
                                    <option value="Hiker">Hiker</option>
                                    <option value="Pro">Pro</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <ul></ul>

                        <Row>
                            <Form.Group>
                                <Form.Select id='region-select' data-test-id="region" value={region}
                                    onChange={e => setRegion(e.target.value)}
                                    aria-label="region" size="lg">
                                    <option value="select">Select the Region</option>
                                    {State.getStatesOfCountry("IT").map((r, k) => <option key={k} value={r.name}>{r.name}</option>)}                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <ul></ul>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <h5 id='minimum-length-label'>Minimum Length (km): </h5>
                                    <Form.Control 
                                        id='minimum-length-control'
                                        value={minLength}
                                        onChange={e => setMinLength(e.target.value)}
                                        type='number' placeholder="Minimum Length" size="lg" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5 id='maximum-length-label'>Maximum Length (km): </h5>
                                    <Form.Control
                                        id='maximum-length-control'
                                        value={maxLength}
                                        onChange={e => setMaxLength(e.target.value)}
                                        type='number' placeholder="Maximum Length" size="lg" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <ul></ul>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <h5 id='minimum-ascent-label'>Minimum Ascent (m): </h5>
                                    <Form.Control
                                        id='minimum-ascent-control'
                                        value={minAscent}
                                        onChange={e => setMinAscent(e.target.value)}
                                        type='number' placeholder="Minimum Ascent" size="lg" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5 id='maximum-ascent-label'>Maximum Ascent (m): </h5>
                                    <Form.Control
                                        id='maximum-ascent-control'
                                        value={maxAscent}
                                        onChange={e => setMaxAscent(e.target.value)}
                                        type='number' placeholder="Maximum Ascent" size="lg" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <ul></ul>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <h5 id='minimum-time-label'>Minimum Time (hours): </h5>
                                    <Form.Control 
                                        id='minimum-time-control'
                                        value={minTime}
                                        onChange={e => setMinTime(e.target.value)}
                                        type='number' placeholder="Minimum Time" size="lg" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <h5 id='maximum-time-label'>Maximum Time (hours): </h5>
                                    <Form.Control
                                        id='maximum-time-control'
                                        value={maxTime}
                                        onChange={e => setMaxTime(e.target.value)}
                                        type='number' placeholder="Maximum Time" size="lg" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ width: "100%", marginTop: "2%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                <Button id='confirm-button' data-test-id="confirm" variant="success" type="submit" size="lg">
                                    Confirm
                                </Button>
                            </Col>
                        </Row>
                    </Form>}
            <ul></ul>
        </Container >
    );
}

export { HikeFilterForm };