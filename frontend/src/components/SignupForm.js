import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import userDAO from "../../../backend/UserDAO/userDAO.js"
import API from "../API";


const handlerSignup = async (email, password, fullName, role, phoneNumber) => {
    try {
        let user = await API.signup(email, password, fullName, role, phoneNumber);

        return user;

    } catch (err) {
        console.log(err);
        return false;
    }
};



function SignupForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await handlerSignup(email, fullName, password, role, phoneNumber);
        props.setLoggedIn(true);

        if (result !== false)
            navigate(`/home`);
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

    return (
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
                                <option value="localGuide">Local Guide</option>
                                <option value="hutWorker">Hut worker</option>
                                <option value="emergencyOperator">Emergency operator</option>
                            </Form.Select>
                        </Form.Group>

                        {(role === "hutWorker" || role === "localGuide") &&
                            <Form.Group controlId="email">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="text" placeholder="Phone number" required={true}
                                    onChange={ev => { setPhoneNumber(ev.target.value) }}
                                />
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
        </Container >
    );
}



export { SignupForm }