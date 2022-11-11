import { Form, Button, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";


const handlerSignup = async (email, password, fullName, role, phoneNumber) => {
    try {
        let body = {
            email: email,
            password: password,
            fullName: fullName,
            role: role,
            phoneNumber: phoneNumber
        }
        let user = await API.signup(body);

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
    const [role, setRole] = useState("hiker");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let result = await handlerSignup(email, fullName, password, role, phoneNumber);
        // props.setLoggedIn(true);

        if (result !== false)
            navigate(`/`);
        else
            setError(true);
    }



    return (
        <div style={{ width: "40vw" }}>

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

                {(role === "hutWorker" || role === "localGuide") &&
                    <Form.Group controlId="email">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="Phone number" required={(role === "hutWorker" || role === "localGuide")}
                            onChange={ev => { setPhoneNumber(ev.target.value) }}
                        />
                    </Form.Group>}

                <Button type="submit">Login</Button>



            </Form>

        </div>
    );
}



export { SignupForm }