import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../API";



const handlerLogin = async (username, password) => {
    try {
        let user = await API.login(username, password);
        return user;

    } catch (err) {
        console.log(err);
        return false;
    }
};


function LoginForm({ user, setUser }) {

    const [email, setEmail] = useState('maurizio.merluzzo@donkeykong.com');
    const [password, setPassword] = useState('testPassword1');

    const [loginError, setLoginError] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await handlerLogin(email, password);

        if (result !== false) {
            if (result === 412) {
                setErrorText('Please verify your email to access.');
                setError(true);
            } else if (result === 403) {
                setErrorText('Your account has not been approved yet. Please contact the platform manager.')
                setError(true);
            } else if (result === 401)
                setLoginError(true);
            else {
                setUser(result);
                navigate(`/`);
            }
        }
        else
            setLoginError(true);
    }


    const handleBack = (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');
        setError(false);
        navigate('/');
    }

    return <>
        {!error &&
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
                                <Col>
                                    <Button id='back-button' onClick={handleBack} variant='danger' size='lg'>Back</Button>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button id='log-in-button' type="submit" variant='success' size='lg'>Log-In</Button>
                                </Col>
                            </Row>
                            {loginError && <span>Error: email or password not correct</span>}
                        </Form>
                    </Col>
                </Row>
                <ul></ul>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h3 className="text-center">Are you new here? Create your account</h3>
                        <ul></ul>
                        <div className="d-grid gap-2">
                            <Button id='sign-up-button' onClick={() => { navigate('/signup') }} variant='outline-success' size='lg'>Sign-Up</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        }
        {error &&
            <ErrorDisplay
                errorText={errorText}
                setError={setError}
                setErrorText={setErrorText}
            />
        }
    </>
}

function ErrorDisplay(props) {
    return (
        <div className="display-container">
            <p className="text-center">{props.errorText}</p>
            <div className="d-grid gap-2 mt-1">
                <Button type="submit" className="guideBtn" borderless="true"><Nav.Link onClick={() => { props.setError(false); props.setErrorText(''); }} style={{ color: "white" }} active>CLOSE</Nav.Link></Button>
            </div>
        </div>
    );

}


export { LoginForm };