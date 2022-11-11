import { Form, Button } from 'react-bootstrap';
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


function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await handlerLogin(email, password);

        if (result !== false) {
            navigate(`/`);
        }
        else
            setError(true);
    }



    return (
        <div style={{ width: "50vw" }}>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" required={true}
                        onChange={ev => { setEmail(ev.target.value) }}
                    />
                </Form.Group>


                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required={true}
                        onChange={ev => { setPassword(ev.target.value) }}
                    />
                </Form.Group>

                <Button type="submit">Login</Button>

                {error && <span>Error: email or password not correct</span>}

            </Form>

        </div>
    );
}


export { LoginForm };