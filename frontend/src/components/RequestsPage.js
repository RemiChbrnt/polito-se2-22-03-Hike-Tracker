import { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import API from "../API";

const RequestsPage = (props) => {

    const [pendingUsers, setPendingUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPendingUsers = async () => {
        const testUsers = await API.getPendingUsers();
        setPendingUsers(testUsers);
        setIsLoading(false);
    }

     // TODO: Remove
    const testGetPendingUsers = async () => {
        const pendingUsers = [
            {
                "email": "testUser1@polito.it",
                "fullName": "Test User1",
                "role": "hutworker",
                "phoneNumber": "1234567890"
            },
            {
                "email": "testUser2@polito.it",
                "fullName": "Test User2",
                "role": "guide",
                "phoneNumber": "0987654321"
            },
            {
                "email": "testUser3@polito.it",
                "fullName": "Test User3",
                "role": "guide",
                "phoneNumber": "456789120"
            }
        ];
        setPendingUsers(pendingUsers);
        setIsLoading(false);
    }

    const approveUser = async (email) => {
        try {
            await API.approveUser(email);
            getPendingUsers();
        } catch(e) {
            console.log('ERROR APPROVING USER: ' + e);
            throw e;
        }
    }

    const declineUser = async (email) => {
        try {
            await API.declineUser(email);
            getPendingUsers();
        } catch(e) {
            console.log('ERROR DECLINING USER: ' + e);
            throw e;
        }
    }

    useEffect(() => {
            //getPendingUsers();
            testGetPendingUsers(); // TODO: Remove
    }, []);

    return <>
        <Container fluid>
        {
            isLoading 
                ? <h3>Loading pending users...</h3>
                : <RequestsList
                    pendingUsers={pendingUsers}
                    approveUser={approveUser}
                    declineUser={declineUser}
                />
        }
        </Container>
    </>
}

function RequestsList(props) {

    return <>
        <Table bordered striped hover>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Requested role</th>
                    <th>Phone number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.pendingUsers.map((user) => <TableRow key={user.email} user={user} approveUser={props.approveUser} declineUser={props.declineUser}/>)}
            </tbody>
        </Table>
    </>
}

function TableRow(props) {

    return <tr>
        <td>{props.user.email}</td>
        <td>{props.user.fullName}</td>
        <td>{props.user.role}</td>
        <td>{props.user.phoneNumber}</td>
        <td>
            <Container fluid>
                <Row>
                    <Col lg={4}>
                        <Button variant="success" onClick={() => props.approveUser(props.user.email)}>Approve</Button>
                    </Col>
                    <Col lg={4}>
                        <Button variant="danger" onClick={() => props.declineUser(props.user.email)}>Decline</Button>
                    </Col>
                </Row>
            </Container>
        </td>
    </tr>
}

export default RequestsPage;