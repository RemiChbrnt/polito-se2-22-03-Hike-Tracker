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

                            {/*
                            <option value="AG"></option>
                            <option value="AL"></option>
                            <option value="AN"></option>
                            <option value="AO"></option>
                            <option value="AR"></option>
                            <option value="AP"></option>
                            <option value="AT"></option>
                            <option value="AV"></option>
                            <option value="BA"></option>
                            <option value="BT"></option>
                            <option value="BL"></option>
                            <option value="BN"></option>
                            <option value="BG"></option>
                            <option value="BI"></option>
                            <option value="BO"></option>
                            <option value="BZ"></option>
                            <option value="BS"></option>
                            <option value="BR"></option>
                            <option value="CA"></option>
                            <option value="CL"></option>
                            <option value="CB"></option>
                            <option value="CI"></option>
                            <option value="CE"></option>
                            <option value="CT"></option>
                            <option value="CZ"></option>
                            <option value="CH"></option>
                            <option value="CO"></option>
                            <option value="CS"></option>
                            <option value="CR"></option>
                            <option value="KR"></option>
                            <option value="CN"></option>
                            <option value="EN"></option>
                            <option value="FM"></option>
                            <option value="FE"></option>
                            <option value="FI"></option>
                            <option value="FG"></option>
                            <option value="FC"></option>
                            <option value="FR"></option>
                            <option value="GE"></option>
                            <option value="GO"></option>
                            <option value="GR"></option>
                            <option value="IM"></option>
                            <option value="IS"></option>
                            <option value="SP"></option>
                            <option value="AQ"></option>
                            <option value="LT"></option>
                            <option value="LE"></option>
                            <option value="LC"></option>
                            <option value="LI"></option>
                            <option value="LO"></option>
                            <option value="LU"></option>
                            <option value="MC"></option>
                            <option value="MN"></option>
                            <option value="MS"></option>
                            <option value="MT"></option>
                            <option value="ME"></option>
                            <option value="MI"></option>
                            <option value="MO"></option>
                            <option value="MB"></option>
                            <option value="NA"></option>
                            <option value="NO"></option>
                            <option value="NU"></option>
                            <option value="OT"></option>
                            <option value="OR"></option>
                            <option value="PD"></option>
                            <option value="PA"></option>
                            <option value="PR"></option>
                            <option value="PV"></option>
                            <option value="PG"></option>
                            <option value="PU"></option>
                            <option value="PE"></option>
                            <option value="PC"></option>
                            <option value="PI"></option>
                            <option value="PT"></option>
                            <option value="PN"></option>
                            <option value="PZ"></option>
                            <option value="PO"></option>
                            <option value="RG"></option>
                            <option value="RA"></option>
                            <option value="RC"></option>
                            <option value="RE"></option>
                            <option value="RI"></option>
                            <option value="RN"></option>
                            <option value="RM"></option>
                            <option value="RO"></option>
                            <option value="SA"></option>
                            <option value="VS"></option>
                            <option value="SS"></option>
                            <option value="SV"></option>
                            <option value="SI"></option>
                            <option value="SR"></option>
                            <option value="SO"></option>
                            <option value="TA"></option>
                            <option value="TE"></option>
                            <option value="TR"></option>
                            <option value="TO"></option>
                            <option value="OG"></option>
                            <option value="TP"></option>
                            <option value="TN"></option>
                            <option value="TV"></option>
                            <option value="TS"></option>
                            <option value="UD"></option>
                            <option value="VA"></option>
                            <option value="VE"></option>
                            <option value="VB"></option>
                            <option value="VC"></option>
                            <option value="VR"></option>
                            <option value="VV"></option>
                            <option value="VI"></option>
                            <option value="VT"></option>
                            */}
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