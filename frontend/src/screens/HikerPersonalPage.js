import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, ListGroup, Form, Col, Row } from 'react-bootstrap';
import API from '../API';

const HikerPersonalPage = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [preferences, setPreferences] = useState(undefined);
    const [loggedUser, setLoggedUser] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [operation, setOperation] = useState(undefined);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [startedHike, setStartedHike] = useState("");

    let navigate = useNavigate()

    useEffect(() => {
        async function getUserInfoAndPreferences() {
            const user = await API.getUserInfo();
            setLoggedUser(user);
            const prefs = await API.getPreferences();
            if (Object.keys(prefs.body).length === 0)
                setPreferences(undefined);
            else
                setPreferences(prefs.body);

        }
        getUserInfoAndPreferences();

        const getStartedHike = async () => {
            await API.getCurrentGroup()
                .then(result => {
                    if (result !== 204)
                        setStartedHike(result.hikeId);

                    setIsLoading(false);
                }).catch(error => console.log(error));
        };

        getStartedHike();
    }, []);

    return <>
        <Container fluid>
            {
                isLoading
                    ? <h3>Loading...</h3>

                    : <Container>
                        <Row>
                            <Col md={9}>
                                <h1 id="title">Hike preferences</h1>
                            </Col>
                            <Col md={3}>
                                {(startedHike !== "") &&
                                    <Button id='go-to-hike-button' variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate("/hike-detail-" + startedHike); }}><h4 className="text-white">Go To Started Hike</h4></Button>
                                }
                            </Col>
                        </Row>
                        {
                            showDeleteConfirmation
                                ? <DeleteConfirmation
                                    setPreferences={setPreferences}
                                    userEmail={loggedUser.email}
                                    setShowDeleteConfirmation={setShowDeleteConfirmation}
                                    setSuccess={setSuccess}
                                    setError={setError}
                                    setShowConfirm={setShowConfirm}
                                />
                                : showConfirm
                                    ? <ConfirmDisplay
                                        success={success}
                                        setSuccess={setSuccess}
                                        setError={setError}
                                        error={error}
                                        setShowConfirm={setShowConfirm}
                                    />
                                    : preferences === undefined
                                        ? <EmptyPrefsCard
                                            preferences={preferences}
                                            setPreferences={setPreferences}
                                            userEmail={loggedUser.email}
                                            showForm={showForm}
                                            setShowForm={setShowForm}
                                            operation={operation}
                                            setOperation={setOperation}
                                            setSuccess={setSuccess}
                                            setError={setError}
                                            setShowConfirm={setShowConfirm}
                                        />
                                        : <PrefsCard
                                            preferences={preferences}
                                            setPreferences={setPreferences}
                                            userEmail={loggedUser.email}
                                            showForm={showForm}
                                            setShowForm={setShowForm}
                                            operation={operation}
                                            setOperation={setOperation}
                                            showDeleteConfirmation={showDeleteConfirmation}
                                            setShowDeleteConfirmation={setShowDeleteConfirmation}
                                            setSuccess={setSuccess}
                                            setError={setError}
                                            setShowConfirm={setShowConfirm}
                                        />
                        }

                        <ul></ul>

                        {/*(startedHike !== "") &&
                            <Col>
                                <Button variant="white" size="lg" style={{ backgroundColor: "#00706c" }} onClick={() => { navigate("/hike-detail-" + startedHike); }}><h4 className="text-white">Go To Started Hike</h4></Button>
                    </Col>*/}
                    </Container>
            }
        </Container>
    </>
}

function EmptyPrefsCard(props) {

    return <>
        <ul></ul>
        <h4>You don't have any preference set. You can set them now.</h4>
        <ul></ul>
        {
            props.showForm!== true ?
            <Button variant='outline-success' onClick={() => { props.setShowForm(true); props.setOperation('add') }}>
            Set hike preferences
            </Button>
            :false

        }
        <ul></ul>
        {
            props.showForm && <PreferencesForm
                userEmail={props.userEmail}
                preferences={props.preferences}
                setPreferences={props.setPreferences}
                setShowForm={props.setShowForm}
                operation={props.operation}
                setSuccess={props.setSuccess}
                setError={props.setError}
                setShowConfirm={props.setShowConfirm} />
        }
    </>
}

function PrefsCard(props) {

    return <>
        <Container>
            <ul></ul>
            <Row>
                <Col>
                    <Row>
                        <h4 id='duration'><span className="fw-bold">Duration: </span>{props.preferences.duration} hours</h4>
                    </Row>
                    <Row>
                        <h4 id='ascent'><span className="fw-bold">Ascent: </span>{props.preferences.ascent} m</h4>
                    </Row>
                </Col>
                {
                    props.showForm !== true ?
                        <Col>
                            <Button id='edit-button' variant='warning' onClick={() => { props.setShowForm(true); props.setOperation('edit'); }}>
                                <h5><i className="bi bi-pencil"></i> {' '}Edit</h5>
                            </Button>
                            {' '}
                            <Button id='delete-button' variant='danger' onClick={() => props.setShowDeleteConfirmation(true)}>
                                <h5><i className="bi bi-trash3"></i>{' '}Delete</h5>
                            </Button>
                        </Col>
                        : false
                }
            </Row>
            <ul></ul>
            <Row>
                {
                    props.showForm && <PreferencesForm
                        userEmail={props.userEmail}
                        preferences={props.preferences}
                        setPreferences={props.setPreferences}
                        setShowForm={props.setShowForm}
                        operation={props.operation}
                        setSuccess={props.setSuccess}
                        setError={props.setError}
                        setShowConfirm={props.setShowConfirm} />
                }
            </Row>
        </Container>
    </>
}

function PreferencesForm(props) {
    const [ascent, setAscent] = useState(props.preferences === undefined ? 0 : props.preferences.ascent);
    const [duration, setDuration] = useState(props.preferences === undefined ? 0 : props.preferences.duration);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPrefs = {
            "email": props.userEmail.toString(),
            "duration": duration,
            "ascent": ascent
        }
        props.setPreferences(newPrefs);
        if (props.operation === 'add') {
            const result = await API.createPreferences(newPrefs);
            if (result !== false)
                props.setSuccess(true);
            else
                props.setError(true);
        } else if (props.operation === 'edit') {
            const result = await API.updatePreferences(newPrefs);
            if (result !== false)
                props.setSuccess(true);
            else
                props.setError(true);
        }
        setAscent(0);
        setDuration(0);
        props.setShowConfirm(true);
        props.setShowForm(false);
    }

    return <>
        <h5 id='edit-hike-title'>
            Edit hike
        </h5>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="preferencesForm">
                <Form.Label id='duration-label'>Duration (hours)</Form.Label>
                <Form.Control id='duration-control' type="number" value={duration} required={true} onChange={(event) => { setDuration(event.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="preferencesForm">
                <Form.Label id='ascent-label'>Ascent (m)</Form.Label>
                <Form.Control id='ascent-control' type="number" value={ascent} required={true} onChange={(event) => { setAscent(event.target.value) }} />
            </Form.Group>

            <Button id='cancel-button' variant='danger' onClick={() => {
                setAscent(0);
                setDuration(0);
                props.setShowForm(false);
            }}><h5>Cancel</h5></Button>{' '}
            <Button id='confirm-button' variant='success' type='submit'><h5>Confirm</h5></Button>
        </Form>
    </>
}

function DeleteConfirmation(props) {
    async function deletePrefs(userEmail, setSuccess, setError, setShowConfirm, setShowDeleteConfirmation) {
        const result = await API.deletePreferences(userEmail);
        if (result !== false) {
            props.setSuccess(true);
            props.setPreferences(undefined);
        }
        else {
            props.setError(true);
        }
        props.setShowConfirm(true);
        props.setShowDeleteConfirmation(false);
    }
    return <>
        <ul></ul>
        <h4 id='are-you-sure-title'>Are you sure you want to delete your preferences?</h4>
        <ul></ul>
        <Button id='yes-sure-button' variant='danger' onClick={() => deletePrefs(props.userEmail, props.setSuccess, props.setError, props.setShowConfirm, props.setShowDeleteConfirmation)}>
            Yes, delete my preferences.
        </Button>
        {' '}
        <Button id='no-button' variant='secondary' onClick={() => props.setShowDeleteConfirmation(false)}>
            No, keep my preferences.
        </Button>
        <ul></ul>
    </>
}

function ConfirmDisplay(props) {
    if (props.success) {
        return <>
            <ul></ul>
            <div className="display-container">
                <h4 className="text-center">Preferences updated.</h4>
                <ul></ul>
                <div className="d-grid gap-2 mt-1">
                    <Button type="submit" className="guideBtn" borderless="true" onClick={() => { props.setShowConfirm(false); props.setSuccess(false); }} style={{ color: "white" }} active>
                        Close
                    </Button>
                </div>
            </div>
        </>
    } else if (props.error) {
        return <>
            <div className="display-container">
                <p className="text-center">There was an error updating your preferences. Please try again.</p>
                <div className="d-grid gap-2 mt-1">
                    <Button type="submit" className="guideBtn" borderless="true" onClick={() => { props.setShowConfirm(false); props.setError(false); }} style={{ color: "white" }} active>
                        Close
                    </Button>
                </div>
            </div>
        </>
    }
}

export default HikerPersonalPage;