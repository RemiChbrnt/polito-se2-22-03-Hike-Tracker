import { useState } from "react";
import { Container, Form, Col, Button} from 'react-bootstrap';
import { CoordsFromMap } from "./coordsFromMap";

const HikeFilterMap = ({setCoords, setRadiusFilter, setShow}) => {

    const [radius, setRadius] = useState(10000);
    const center = [45.116177, 7.742615];

    return (
        <Container>
            <Form.Label><b>Radius (m)</b></Form.Label>
            <Form.Control className="mb-2" type="number" value={radius}
                onChange={ev => { setRadius(ev.target.value); setRadiusFilter(ev.target.value)}}
            />
            <CoordsFromMap center={center} radius={radius} setCoords={setCoords}/>
            <Col>
                <Button variant="success" onClick={() => setShow(false)}>
                    Confirm
                </Button>
            </Col>
        </Container>
    );
}

export { HikeFilterMap };