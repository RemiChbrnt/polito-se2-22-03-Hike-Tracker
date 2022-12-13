import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";


const handlerSignup = async (email, fullName, password, role, phoneNumber, hut) => {
    try {
        let body = {
            email: email,
            password: password,
            fullName: fullName,
            role: role,
            phoneNumber: phoneNumber,
            hut: hut
        }
        let user = await API.signup(body);
        return user;

    } catch (err) {
        console.log(err);
        return false;
    }
};



function SignupForm({ user, setUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("hiker");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [huts, setHuts] = useState([]);
    const [hut, setHut] = useState(undefined);

    let navigate = useNavigate();

    useEffect(() => {
        async function getHuts() {
            const huts = await API.getHuts();
            setHuts(huts);
            setHut(huts[0].id);
        }

        getHuts();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await handlerSignup(email, fullName, password, role, phoneNumber, hut);
        // props.setLoggedIn(true);

        if (result !== false) {
            setMessageText('Thank you! Please check your email and verify your account to access the reserved features.');
            setMessage(true);
        }

        else
            setError(true);
    }

    const handleBack = (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');
        setFullName('');
        setRole('');
        setPhoneNumber('');
        setError(false);
        navigate('/login');
    }

    return <>
        {!message &&
            <Container>
                <ul></ul>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h2 className="text-center">Sign-Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" required={true}
                                    onChange={ev => { setEmail(ev.target.value) }}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required={true}
                                    onChange={ev => { setPassword(ev.target.value) }}
                                />
                            </Form.Group>

                            <Form.Group controlId="fullName">
                                <Form.Label>FullName</Form.Label>
                                <Form.Control type="text" placeholder="Full name" required={true}
                                    onChange={ev => { setFullName(ev.target.value) }}
                                />
                            </Form.Group>

                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select required={true}
                                    onChange={ev => { setRole(ev.target.value) }}>
                                    <option value="hiker">Hiker</option>
                                    <option value="guide">Local Guide</option>
                                    <option value="hutworker">Hut worker</option>
                                    <option value="emergency">Emergency operator</option>
                                </Form.Select>
                            </Form.Group>

                            {(role === "guide" || role === "hutworker") &&
                                <Form.Group controlId="email">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control type="text" placeholder="Phone number" required={true}
                                        onChange={ev => { setPhoneNumber(ev.target.value) }}
                                    />
                                </Form.Group>
                            }
                            {
                                role === "hutworker" &&
                                <Form.Group controlId="hutlist">
                                    <Form.Label>Select your hut</Form.Label>
                                    <Form.Select
                                        value={hut}
                                        onChange={event => {
                                            console.log('You selected hut: ' + event.target.value);
                                            setHut(event.target.value)
                                        }
                                        }>
                                        {huts.map((hut) => <option value={hut.id} key={hut.id}>{hut.name}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            }

                            <ul></ul>
                            <Row>
                                <Col md={3} xs={3}>
                                    <Button onClick={handleBack} variant='danger' size='lg'>Back</Button>{" "}
                                </Col>
                                <Col md={2} xs={2}></Col>
                                <Col md={7} xs={7}>
                                    <Button type="submit" variant='success' size='lg'>Sign-Up</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        }
        {
            message &&
            <MessageDisplay
                setMessage={setMessage}
                setMessageText={setMessageText}
                messageText={messageText}
            />
        }
    </>
}

function MessageDisplay(props) {

    const navigate = useNavigate();

    return (
        <div className="display-container">
            <p className="text-center">{props.messageText}</p>
            <div className="d-grid gap-2 mt-1">
                <Button type="submit" className="guideBtn" borderless="true"><Nav.Link onClick={() => { props.setMessage(false); props.setMessageText(''); navigate(`/login`); }} style={{ color: "white" }} active>CLOSE</Nav.Link></Button>
            </div>
        </div>
    );

}


export { SignupForm }