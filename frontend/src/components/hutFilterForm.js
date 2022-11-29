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
    const [minAltitude, setMinAltitude] = useState("");
    const [maxAltitude, setMaxAltitude] = useState("");
    const [numberOfBeds, setNumberOfBeds] = useState("");
    const [cost, setCost] = useState("");
    const [food, setFood] = useState("");

    const [location, setLocation] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.setShow(false);
        let filters = [];
        if (name !== "") {
            filters.push({ key: "name", value: name.toLocaleLowerCase() });
        }
        if (numberOfBeds !== "") {
            filters.push({ key: "numberOfBeds", value: numberOfBeds });
        }
        if (cost !== "") {
            filters.push({ key: "cost", value: cost });
        }
        if (food !== "") {
            filters.push({ key: "food", value: food });
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
            filters.push({ key: "province", value: province });
        }
        if (town !== "") {
            filters.push({ key: "town", value: town.toLocaleLowerCase() });
        }
        if (address !== "") {
            filters.push({ key: "address", value: address.toLocaleLowerCase() });
        }
        if (maxAltitude !== "") {
            filters.push({ key: "maxAltitude", value: maxAltitude });
        }
        if (minAltitude !== "") {
            filters.push({ key: "minAltitude", value: minAltitude });
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
                        <h5>Number of beds: </h5>
                        <Form.Control
                            value={latitude}
                            onChange={e => setNumberOfBeds(e.target.value)}
                            type='number' placeholder="Number Of Beds" size="lg" />
                    </Form.Group>
                </Row>
                <ul></ul>
                <Row>
                    <Form.Group>
                        <h5>Cost: </h5>
                        <Form.Control
                            value={latitude}
                            onChange={e => setCost(e.target.value)}
                            type='number' placeholder="Cost" size="lg" />
                    </Form.Group>
                </Row>
                <ul></ul>
                <Row>
                    <Form.Group>
                        <h5>Food: </h5>
                        <Form.Select value={province}
                            onChange={e => setFood(e.target.value)}
                            aria-label="region" size="lg">
                            <option>Select food type</option>
                            <option value="AG">buffet</option>
                            <option value="AL">Alessandria</option>
                            <option value="AN">Ancona</option>
                        </Form.Select>
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
                <ul></ul>

                {location === "address" ?
                    <>
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
                                <h5>Province: </h5>
                                <Form.Select value={province}
                                    onChange={e => setProvince(e.target.value)}
                                    aria-label="region" size="lg">
                                    <option>Select the Province</option>
                                    <option value="AG">Agrigento</option>
                                    <option value="AL">Alessandria</option>
                                    <option value="AN">Ancona</option>
                                    <option value="AO">Aosta</option>
                                    <option value="AR">Arezzo</option>
                                    <option value="AP">Ascoli Piceno</option>
                                    <option value="AT">Asti</option>
                                    <option value="AV">Avellino</option>
                                    <option value="BA">Bari</option>
                                    <option value="BT">Barletta-Andria-Trani</option>
                                    <option value="BL">Belluno</option>
                                    <option value="BN">Benevento</option>
                                    <option value="BG">Bergamo</option>
                                    <option value="BI">Biella</option>
                                    <option value="BO">Bologna</option>
                                    <option value="BZ">Bolzano</option>
                                    <option value="BS">Brescia</option>
                                    <option value="BR">Brindisi</option>
                                    <option value="CA">Cagliari</option>
                                    <option value="CL">Caltanissetta</option>
                                    <option value="CB">Campobasso</option>
                                    <option value="CI">Carbonia-Iglesias</option>
                                    <option value="CE">Caserta</option>
                                    <option value="CT">Catania</option>
                                    <option value="CZ">Catanzaro</option>
                                    <option value="CH">Chieti</option>
                                    <option value="CO">Como</option>
                                    <option value="CS">Cosenza</option>
                                    <option value="CR">Cremona</option>
                                    <option value="KR">Crotone</option>
                                    <option value="CN">Cuneo</option>
                                    <option value="EN">Enna</option>
                                    <option value="FM">Fermo</option>
                                    <option value="FE">Ferrara</option>
                                    <option value="FI">Firenze</option>
                                    <option value="FG">Foggia</option>
                                    <option value="FC">Forlì-Cesena</option>
                                    <option value="FR">Frosinone</option>
                                    <option value="GE">Genova</option>
                                    <option value="GO">Gorizia</option>
                                    <option value="GR">Grosseto</option>
                                    <option value="IM">Imperia</option>
                                    <option value="IS">Isernia</option>
                                    <option value="SP">La Spezia</option>
                                    <option value="AQ">L'Aquila</option>
                                    <option value="LT">Latina</option>
                                    <option value="LE">Lecce</option>
                                    <option value="LC">Lecco</option>
                                    <option value="LI">Livorno</option>
                                    <option value="LO">Lodi</option>
                                    <option value="LU">Lucca</option>
                                    <option value="MC">Macerata</option>
                                    <option value="MN">Mantova</option>
                                    <option value="MS">Massa-Carrara</option>
                                    <option value="MT">Matera</option>
                                    <option value="ME">Messina</option>
                                    <option value="MI">Messina</option>
                                    <option value="MO">Messina</option>
                                    <option value="MB">Messina</option>
                                    <option value="NA">Napoli</option>
                                    <option value="NO">Novara</option>
                                    <option value="NU">Nuoro</option>
                                    <option value="OT">Olbia-Tempio</option>
                                    <option value="OR">Oristano</option>
                                    <option value="PD">Padova</option>
                                    <option value="PA">Palermo</option>
                                    <option value="PR">Parma</option>
                                    <option value="PV">Pavia</option>
                                    <option value="PG">Perugia</option>
                                    <option value="PU">Pesaro e Urbino</option>
                                    <option value="PE">Pescara</option>
                                    <option value="PC">Piacenza</option>
                                    <option value="PI">Pisa</option>
                                    <option value="PT">Pistoia</option>
                                    <option value="PN">Pordenone</option>
                                    <option value="PZ">Potenza</option>
                                    <option value="PO">Prato</option>
                                    <option value="RG">Ragusa</option>
                                    <option value="RA">Ravenna</option>
                                    <option value="RC">Reggio Calabria</option>
                                    <option value="RE">Reggio Emilia</option>
                                    <option value="RI">Rieti</option>
                                    <option value="RN">Rimini</option>
                                    <option value="RM">Roma</option>
                                    <option value="RO">Rovigo</option>
                                    <option value="SA">Salerno</option>
                                    <option value="VS">Medio Campidano</option>
                                    <option value="SS">Sassari</option>
                                    <option value="SV">Savona</option>
                                    <option value="SI">Siena</option>
                                    <option value="SR">Siracusa</option>
                                    <option value="SO">Sondrio</option>
                                    <option value="TA">Taranto</option>
                                    <option value="TE">Teramo</option>
                                    <option value="TR">Terni</option>
                                    <option value="TO">Torino</option>
                                    <option value="OG">Ogliastra</option>
                                    <option value="TP">Trapani</option>
                                    <option value="TN">Trento</option>
                                    <option value="TV">Treviso</option>
                                    <option value="TS">Trieste</option>
                                    <option value="UD">Udine</option>
                                    <option value="VA">Varese</option>
                                    <option value="VE">Venezia</option>
                                    <option value="VB">Verbano-Cusio-Ossola</option>
                                    <option value="VC">Vercelli</option>
                                    <option value="VR">Verona</option>
                                    <option value="VV">Vibo Valentia</option>
                                    <option value="VI">Vicenza</option>
                                    <option value="VT">Viterbo</option>
                                </Form.Select>
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
                    <Col md={10} xs={8}>
                        <Button variant="danger" onClick={() => props.setShow(false)} size="lg">
                            Back
                        </Button>
                    </Col>
                    <Col md={2} xs={4}>
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