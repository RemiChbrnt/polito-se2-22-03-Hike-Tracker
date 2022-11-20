import { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import API from '../API';

const HikerPersonalPage = (props) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState(undefined);

    // TODO: get preferences from current user
    useEffect(() => {
        async function getPreferences(mail) {
            const prefs = await API.getPreferences(mail);
            if(Object.keys(prefs.body).length === 0)
                setPreferences(undefined);
            else
                setPreferences(prefs);
            setIsLoading(false);
        }
        getPreferences("maurizio.merluzzo@donkeykong.com");
    }, []);

    return <>
        <Container fluid>
            {
                isLoading ? <h3>Loading preferences...</h3> : 
                preferences === undefined ?
                    <EmptyPrefsCard/> :
                    <PrefsCard duration={preferences.duration} ascent={preferences.ascent}/>
            }
        </Container>
    </>
}

function EmptyPrefsCard() {

    const [showForm, setShowForm] = useState(false);

    return <Card>
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

export default HikerPersonalPage;