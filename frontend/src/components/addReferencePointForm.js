import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";

// API call to push a location to the database (for Start and End points if needed)
const handleReferencePointCreation = async (name, type, latitude, longitude, country, region, town, address, altitude, hikeId) => {
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
            altitude: altitude,
        }
        let res = await API.createLocation(body);
        let done = await API.addReferencePoint(hikeId, res.id);

        return done;
    } catch (err) {
        console.log(err);
        return (false);
    }
};

//----- TO DO -----
function AddReferencePointForm({hikeId, userEmail, pointCoords, setAddNewReferencePoint}) {

    const [completedWithSuccess, setCompletedWithSuccess] = useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState('generic');
    const [altitude, setAltitude] = useState("");
    const author = userEmail;

    const [mustSelectPointOnTrack, setMustSelectPointOnTrack] = useState(false);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        if(!Array.isArray(pointCoords)){
            setMustSelectPointOnTrack(true);
        }else{
            // Address from coordinates
            const latitude = pointCoords[0];
            const longitude = pointCoords[1];
            let country, region, address, town = "";
            await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(res => {
                if (res.address.country !== undefined) country = res.address.country;
                if (res.address.county !== undefined) region = res.address.county;
                if (res.display_name !== undefined) address = res.display_name;
                if (res.address.city !== undefined) {
                    town = res.address.city;
                } else {
                    if (res.address.village !== undefined) town = res.address.village;
                }
            });
            let res = await handleReferencePointCreation(name, type, latitude, longitude, country, region, town, address, altitude, hikeId);
            if (res){
                setCompletedWithSuccess(true);
            }else{
                throw new Error(String(res));
            }
        }   
    };


    return (
        <Row>
            {completedWithSuccess? 
            <div>
                <h4>New reference point added with success !</h4>
                <div className="d-grid gap-2 mt-3 mb-5">
                    <Button style={{width:"20%"}} variant="success" onClick={() => setAddNewReferencePoint(false)}>OK</Button>
                </div>
            </div>
            :<Form onSubmit={handlerSubmit} className="hike-form mt-3">
                <h4>Add a new Reference Point !</h4>
                <h6>Click on the map to select a location</h6>
                <Row>
                    <Col>
                        <Form.Group controlId='hutName'>
                            <Form.Label><b>Name</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Control type="text" placeholder="Entre reference location name" required
                                onChange={ev => { setName(ev.target.value); }}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label><b>Type</b> <b className="asterisk-required">*</b></Form.Label>
                        <Form.Select required onChange={ev => {setType(ev.target.value); }}>
                            <option value="generic">Generic</option>
                            <option value="parkinglot">Parking Lot</option>
                            <option value="hut">Hut</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="altitude">
                            <Form.Label><b>Altitude</b></Form.Label>
                            <Form.Control type="number" placeholder="Enter altitude"
                                onChange={ev => { setAltitude(ev.target.value); }}
                            />
                        </Form.Group>
                    </Col>
                </Row>  
                {mustSelectPointOnTrack && <h6 className="asterisk-required">Please select a location on the map.</h6>}
                <Row>
                    <Col style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                        <Button style={{marginLeft: 10}} variant="warning" onClick={() => setAddNewReferencePoint(false)}>CANCEL</Button>
                    </Col>
                </Row>
            </Form>} 
        </Row>
        
    );
}

export { AddReferencePointForm };