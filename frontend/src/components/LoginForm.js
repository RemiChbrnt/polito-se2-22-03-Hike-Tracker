import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../API";



const handlerLogin = async (username, password) => {
    try {
        let user = API.login(username, password);
        return user;

    } catch (err) {
        console.log(err);
        return false;
    }
};


function LoginForm({ user, setUser }) {

    const [email, setEmail] = useState('maurizio.merluzzo@donkeykong.com');
    const [password, setPassword] = useState('testPassword1');
    
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await handlerLogin(email, password);

        if (result !== false) {
            setUser(result);
            navigate(`/`);
        }
        else
            setError(true);
    }


    const handleBack = (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');
        setError(false);
        navigate('/');
    }

    return (
        <Container>
            <ul></ul>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2 className="text-center">Log-In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} required={true}
                                onChange={ev => { setEmail(ev.target.value) }}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} required={true}
                                onChange={ev => { setPassword(ev.target.value) }}
                            />
                        </Form.Group>
                        <ul></ul>
                        <Row>
                            <Col md={4} xs={4}>
                                <Button onClick={handleBack} variant='danger' size='lg'>Back</Button>{" "}
                            </Col>
                            <Col md={2} xs={2}></Col>
                            <Col md={6} xs={6}>
                                <Button type="submit" variant='success' size='lg'>Log-In</Button>
                            </Col>
                        </Row>
                        {error && <span>Error: email or password not correct</span>}
                    </Form>
                </Col>
            </Row>
            <ul></ul>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h3 className="text-center">Are you new here? Create your account</h3>
                    <ul></ul>
                    <div className="d-grid gap-2">
                        <Button onClick={() => { navigate('/signup') }} variant='outline-success' size='lg'>Sign-Up</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}


export { LoginForm };