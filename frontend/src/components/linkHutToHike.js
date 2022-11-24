import { Col, Row, Table, ListGroup, Form, Button, Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";



function LinkHutToHike(props) {
    const [form, setForm]=useState(false);
    const [huts, setHuts]=useState([]); 
    const [loggedIn, setLoggedIn]=useState(false);
    const [hutId, setHutId]=useState('');
    const [hikes, setHikes]=useState([]); 
    const [userEmail, setUserEmail]=useState(''); 

    const getHutsByUserId = async () => {
        //const huts = await API.getHutsByUserId(userEmail);
        const hutsList = [{id: 1, name:"Rifugio La Riposa", latitude: "45.1788097585636", longitude: "7.08152295397762", country:"Italy", province:"TO", town:"Mompantero", altitude: "1000", beds:"1", food: "None", description:"Il Rifugio La Riposa si trova in località Riposa, Mompantero di Susa, a 2185 m di altitudine ed è raggiungibile anche in auto."}]
        setHuts(hutsList);
    };

    useEffect(() => {
      const checkAuth = async () => {
        const user = await API.getUserInfo(); 
        if (user){
          setLoggedIn(true);
          setUserEmail(user.email); 
        }
        return user;
      };
      const getHikes = async()=>{
        const hikes = await API.getHikesList(); 
        setHikes(hikes); 
      }
      checkAuth().then(user=>{
        if(user){
          getHutsByUserId();
          getHikes();
        }
      });
    }, [loggedIn, props.user]);


    return (
      	<>{!form && 
          <div className="container-fluid myTable">
              <HutsTable huts={huts} setForm={setForm} setHutId={setHutId}></HutsTable>
          </div>
        }
        {form &&
          <LinkForm setForm={setForm} hikes={hikes} hutId={hutId}/>
        }
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
                <th className = "hutTableHeader" style={{width:'8%'}}>PROVINCE</th>
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
              <p><b>Beds: </b>{props.hut.beds}</p>
              <p><b>Food: </b>{props.hut.food}</p>
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
            <td style={{textAlign:'center'}}>{props.hut.province}</td>
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

  const [hikeId, setHikeId]=useState(''); 
  //----- TO DO -----
  const linkHut = async (hutId, hikeId) => {
      try {
          let params=JSON.stringify({locationId:hutId, hikeId:hikeId})
          let res= API.linkHut(params);
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
      // if(result !== false){
      //     props.setSuccess(true);
      // }
      // else{
      //     props.setError(true); 
      // }

  };

  return(
    <Container>
      <Row >
          <Col></Col>
          <Col>
            <Form onSubmit={handlerSubmit} className="hike-form">
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

export { LinkHutToHike };