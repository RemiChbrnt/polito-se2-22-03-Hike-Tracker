import { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup, Form } from 'react-bootstrap';
import API from '../API';

const HikerPersonalPage = (props) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState(undefined);

    useEffect(() => {
        async function getPreferences(mail) {
            const prefs = await API.getPreferences(mail);
            if(Object.keys(prefs.body).length === 0)
                setPreferences(undefined);
            else
                setPreferences(prefs.body);
            
            setIsLoading(false);
        }
        getPreferences("maurizio.merluzzo@donkeykong.com"); // TODO: get preferences from actual current user
    }, []);

    return <>
        <Container fluid>
            {
                isLoading ? <h3>Loading preferences...</h3> : 
                preferences === undefined ?
                    <EmptyPrefsCard preferences={preferences} setPreferences={setPreferences}/> :
                    <PrefsCard duration={preferences.duration} ascent={preferences.ascent}/>
            }
        </Container>
    </>
}

function EmptyPrefsCard(props) {

    const [showForm, setShowForm] = useState(false);

    return <> 
        <Card>
                <Card.Body>
                    <Card.Title>
                        <h3 classname="fw-bold">Hike preferences</h3>
                    </Card.Title>
                    <h4>You don't have any preference set. You can set them now.</h4>
                    <Button variant='outline-success' onClick={() => setShowForm(true)}>
                        Set hike preferences
                    </Button>
                </Card.Body>
        </Card>
        {
            showForm && <PreferencesForm 
                preferences={props.preferences}
                setPreferences={props.setPreferences}
                setShowForm={setShowForm}/>
        }
    </>
}

function PrefsCard(props) {
    return <Card>
    <Card.Body>
        <Card.Title>
            <h3 classname="fw-bold">Hike preferences</h3>
        </Card.Title>
        <ListGroup variant="flush">
                        <ListGroup.Item><span className="fw-bold">Duration: </span>{props.duration} km</ListGroup.Item>
                        <ListGroup.Item><span className="fw-bold">Ascent: </span>{props.ascent} km</ListGroup.Item>
                    </ListGroup>
    </Card.Body>
</Card>
}

function PreferencesForm(props) {
    const [ascent, setAscent] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: set preferences to actual current user
        const newPrefs = {
            "email": "maurizio.merluzzo@donkeykong.com",
            "duration": duration,
            "ascent": ascent
        }
        props.setPreferences(newPrefs);
        API.createPreferences(newPrefs);
        setAscent(0);
        setDuration(0);
        props.setShowForm(false);
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="preferencesForm">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="number" value={duration} required={true} onChange={(event) => { setDuration(event.target.value) }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="preferencesForm">
                <Form.Label>Ascent</Form.Label>
                <Form.Control type="number" value={ascent} required={true} onChange={(event) => { setAscent(event.target.value) }}/>
            </Form.Group>

            <Button variant='outline-secondary' onClick={() => {
                setAscent(0);
                setDuration(0);
                props.setShowForm(false);
            }}>Cancel</Button>
            <Button variant='outline-success' type='submit'>Confirm</Button>
        </Form>
    </>
}

export default HikerPersonalPage;