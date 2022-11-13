import React, { useState, useEffect } from "react";
import { Form, Row, Col, ListGroup, Container } from 'react-bootstrap';

function HikeFilterForm(props) {
    const [filterType, setFilterType] = useState(0);

    return (
        <Container>
            <Row>
                <Form>
                    <div key={"inline-radio"} className="mb-3">
                        <Form.Check
                            inline
                            label="Province"
                            name="group1"
                            type='radio'
                            id="radio-0"
                            onClick={() => { setFilterType(1) }}
                        />
                        <Form.Check
                            inline
                            label="Province and radious"
                            name="group1"
                            type='radio'
                            id="radio-1"
                            onClick={() => { setFilterType(2) }}
                        />
                        <Form.Check
                            inline
                            label="cordinate and radious"
                            name="group1"
                            type='radio'
                            id="radio-2"
                            onClick={() => { setFilterType(3) }}
                        />
                    </div>
                </Form>
            </Row>
            <ul></ul>
            {filterType === 1 ?
                <>
                    <Row>
                        <Form.Group>
                            <Form.Select aria-label="region" size="lg">
                                <option>Select the Province</option>
                                <option value="1">Abruzzo</option>
                                <option value="2">Basilicata</option>
                                <option value="3">Calabria</option>
                                <option value="4">Campania</option>
                                <option value="5">Emilia Romagna</option>
                                <option value="6">Friuli Venezia Giulia</option>
                                <option value="7">Lazio</option>
                                <option value="8">Liguria</option>
                                <option value="9">Lombardia</option>
                                <option value="10">Marche</option>
                                <option value="11">Molise</option>
                                <option value="12">Piemonte</option>
                                <option value="13">Puglia</option>
                                <option value="14">Sardegna</option>
                                <option value="15">Sicilia</option>
                                <option value="16">Toscana</option>
                                <option value="17">Trentino Alto</option>
                                <option value="18">Umbria</option>
                                <option value="19">Valle d'Aosta</option>
                                <option value="20">Veneto</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <ul></ul>
                </>
                :
                filterType === 2 ?
                    <>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Select aria-label="region" size="lg">
                                        <option>Select the Province</option>
                                        <option value="1">Abruzzo</option>
                                        <option value="2">Basilicata</option>
                                        <option value="3">Calabria</option>
                                        <option value="4">Campania</option>
                                        <option value="5">Emilia Romagna</option>
                                        <option value="6">Friuli Venezia Giulia</option>
                                        <option value="7">Lazio</option>
                                        <option value="8">Liguria</option>
                                        <option value="9">Lombardia</option>
                                        <option value="10">Marche</option>
                                        <option value="11">Molise</option>
                                        <option value="12">Piemonte</option>
                                        <option value="13">Puglia</option>
                                        <option value="14">Sardegna</option>
                                        <option value="15">Sicilia</option>
                                        <option value="16">Toscana</option>
                                        <option value="17">Trentino Alto</option>
                                        <option value="18">Umbria</option>
                                        <option value="19">Valle d'Aosta</option>
                                        <option value="20">Veneto</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type='number' placeholder="Radious" size="lg" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <ul></ul>
                    </>
                    :
                    filterType === 3 ?
                        <>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Control type='text' placeholder="Latitude" size="lg" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Control type='text' placeholder="Longitude" size="lg" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <ul></ul>
                            <Row>
                                <Form.Group>
                                    <Form.Control type='number' placeholder="Radious" size="lg" />
                                </Form.Group>
                            </Row>
                            <ul></ul>
                        </>
                        :
                        false

            }

            {filterType !== 0 ?
                <>
                    <Row>
                        <Form.Group>
                            <Form.Select aria-label="difficulty" size="lg">
                                <option>Select the Difficulty</option>
                                <option value="1">Turist</option>
                                <option value="2">Hiker</option>
                                <option value="3">Pro</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <ul></ul>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type='number' placeholder="Minimum Length" size="lg" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type='number' placeholder="Maximum Length" size="lg" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <ul></ul>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type='number' placeholder="Minimum Ascent" size="lg" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type='number' placeholder="Maximum Ascent" size="lg" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <ul></ul>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type='number' placeholder="Minimum Tima" size="lg" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type='number' placeholder="Maximum Time" size="lg" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <ul></ul>
                </> 
                :
                false
            }

        </Container>
    );
}

export { HikeFilterForm };