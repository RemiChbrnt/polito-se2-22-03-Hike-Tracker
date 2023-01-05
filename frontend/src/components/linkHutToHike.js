import { Col, Row, Table, ListGroup, Form, Button, Container, Nav} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";



function LinkHutToHike(props) {
    const [form, setForm]=useState(false);
    const [huts, setHuts]=useState([]); 
    const [loggedIn, setLoggedIn]=useState(false);
    const [hutId, setHutId]=useState('');
    const [hikes, setHikes]=useState([]); 
    
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const getHutsByUserId = async (userEmail) => {
        const hutsList = await API.getHutsByUserId(userEmail);
        setHuts(hutsList);
    };
    useEffect(() => {
      let email=''; 
      const checkAuth = async () => {
        const user = await API.getUserInfo(); 
        if (user){
          setLoggedIn(true);
          email=user.email; 
        }
        return user;
      };
      const getHikes = async()=>{
        const hikes = await API.getHikesList(); 
        setHikes(hikes); 
      }
      checkAuth().then(user=>{
        if(user){
          getHutsByUserId(email);
          getHikes();
        }
      });
    }, [loggedIn, props.user]);

    return (
      	<>{!form && !error && !success &&
          <div className="container-fluid myTable">
              <HutsTable huts={huts} setForm={setForm} setHutId={setHutId}></HutsTable>
          </div>
        }
        {form && !error && !success && 
          <LinkForm setForm={setForm} hikes={hikes} hutId={hutId} setError={setError} setSuccess={setSuccess}/>
        }

        {!form && error && <ErrorDisplay setError={setError} setForm={setForm} />}
        {!form && success && <SuccessDisplay setSuccess={setSuccess} setForm={setForm}/>}
        </>

    );
}

function HutsTable(props) {
    
    return (
        <Table hover className="table">
            <thead className="tableHeader">
              <tr>
                <th className = "hutTableHeader" style={{width:'14%'}}>NAME</th>
                <th className = "hutTableHeader" style={{width:'14%'}}>LATITUDE</th>
                <th className = "hutTableHeader" style={{width:'14%'}}>LONGITUDE</th>
                <th className = "hutTableHeader" style={{width:'10%'}}>ALTITUDE</th>
                <th className = "hutTableHeader" style={{width:'10%'}}>COUNTRY</th>
                <th className = "hutTableHeader" style={{width:'8%'}}>REGION</th>
                <th className = "hutTableHeader" style={{width:'12%'}}>TOWN</th>
                <th className = "hutTableHeader" style={{width:'7%'}}>INFO</th>
                <th className = "hutTableHeader" style={{width:'20%'}}>LINK A HIKE</th>
              </tr>
            </thead>
            <tbody>
                {
                  props.huts.map((h, index) => {return <HutRow key={index} hut={h} setForm={props.setForm} setHutId={props.setHutId}/>})
                }
            </tbody>
        </Table>
    );
}

function HutRow(props) {
    const [show, setShow] = useState(false);
      return (
        <>
          <tr>
              <HutData hut={props.hut} show={show} setShow={setShow} setForm={props.setForm} setHutId={props.setHutId}/>
          </tr>
          <tr></tr>
          <tr id={props.hut.id} className={show? "infoVisible" : "infoHidden"}>
              <td colSpan={10} className="extraInfo">
              <p><b>Phone: </b>{props.hut.phone}</p>
              <p><b>Email: </b>{props.hut.email}</p>
              <p><b>Website: </b>{props.hut.website? props.hut.website:"No website available."}</p>
              <p><b>Opening Time: </b>{props.hut.openingTime?props.hut.openingTime:"No information available yet."}</p>
              <p><b>Closing TIme: </b>{props.hut.closingTime?props.hut.closingTime: "No information available yet."}</p>
              <p><b>Beds: </b>{props.hut.numberOfBeds}</p>
              <p><b>Food: </b>{props.hut.food? props.hut.food:"No information available."}</p>
              <h6><b>Description</b></h6>
              <p>{props.hut.description}</p>
              </td>
          </tr>
        </>
      );
  }

  function HutData(props) {

    const activateForm = (hutId) => {
      props.setForm(true); 
      props.setHutId(hutId);
    };

    return (
        <>
            <td style={{textAlign:'center'}}>{props.hut.name}</td>
            <td style={{textAlign:'center'}}>{props.hut.latitude}</td>
            <td style={{textAlign:'center'}}>{props.hut.longitude}</td>
            <td style={{textAlign:'center'}}>{props.hut.altitude}</td>
            <td style={{textAlign:'center'}}>{props.hut.country}</td>
            <td style={{textAlign:'center'}}>{props.hut.region}</td>
            <td style={{textAlign:'center'}}>{props.hut.town}</td>
            <td style={{textAlign:'center'}}>
              <button className="btn" type="button" onClick={() => props.setShow(!props.show)}>
                <i className="bi bi-info-circle"></i>
              </button>
            </td>
            <td style={{textAlign:'center'}}>
              <button className="btn" type="button" onClick={() => activateForm(props.hut.id)}>
                <i className="icons-style bi bi-link"></i>
              </button>
            </td>
        </>
    );
}
  
function LinkForm(props){

  const [hikeId, setHikeId]=useState(1); 

  const linkHut = async (hutId, hikeId) => {
      try {
          let params=({locationId:hutId, hikeId:hikeId})
          let res = await API.linkHut(params);
          return res;

      } catch (err) {
          console.log(err);
          return false;
      }

  };

  const handlerSubmit = async (e) => {
      e.preventDefault();
      props.setForm(false);
      let result = await linkHut(props.hutId, hikeId);

      if(result){
          props.setSuccess(true);
      }
      else{
          props.setError(true); 
      }

  };

  return(
    <Container>
      <Row>
        <Col></Col>
        <Col className="text-center"><h2>Link a Hut to a Hike!</h2></Col>
        <Col></Col>
      </Row>
            <ul></ul>
      <Row >
          <Col></Col>
          <Col>
            <Form onSubmit={handlerSubmit} className="link-form">
              <div className="hike-form-group">
                  <Form.Group className="mb-3" controlId="hutFood">
                      <Form.Label><b>Select a hike to link</b> <b className="asterisk-required">*</b></Form.Label>
                      <Form.Select required onChange={ev => {setHikeId(ev.target.value);}}>
                      {props.hikes.map((h) => {return <option key={h.id} value={h.id}>{h.title}</option>})}
                      </Form.Select>
                  </Form.Group>
                  <div className="d-grid gap-2 mt-3">
                    <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                  </div>
              </div>
            </Form>
            </Col>
            <Col></Col>
      </Row>
    </Container>
  );
}

function ErrorDisplay(props) {

  return (
      <div className="display-container">
          <p className="text-center">There was an error trying to send your request. Please try again.</p>
          <div className="d-grid gap-2 mt-1">
              <Button type="submit" className="guideBtn" borderless="true" onClick={() => { props.setError(false); props.setForm(false); }}>RETRY</Button>
          </div>
      </div>
  );
}

function SuccessDisplay(props) {
  const navigate = useNavigate();

  return (
      <div className="display-container">
          <p className="text-center">Your submission has been sent successfully!</p>
          <div className="d-grid gap-2 mt-1">
              <Button type="submit" className="guideBtn" borderless="true"><Nav.Link onClick={() => { navigate('/'); props.setSuccess(false); props.setForm(false); }} style={{ color: "white" }} active>CLOSE</Nav.Link></Button>
          </div>
      </div>
  );

}
export { LinkHutToHike };