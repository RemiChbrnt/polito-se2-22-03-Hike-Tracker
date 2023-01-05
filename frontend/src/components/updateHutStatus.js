import { Col, Row, Table, ListGroup, Form, Button, Container, Nav} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";



function UpdateHutStatus(props) {
    const [form, setForm]=useState(false);
    const [loggedIn, setLoggedIn]=useState(false);
    const [hutId, setHutId]=useState('');
    const [hikeId, setHikeId]=useState('');
    const [hikes, setHikes]=useState([]); 
    
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const getHutIdByUserId = async () => {
        const id = await API.getHutIdByUserId();
        setHutId(id);
        const h = await API.getHikesByHutId(id); 
        setHikes(h); 
    };

    const getHikes = async()=>{
      const h = await API.getHikesByHutId(hutId); 
      setHikes(h); 
    }

    useEffect(() => {
      const checkAuth = async () => {
        const user = await API.getUserInfo(); 
        if (user){
          setLoggedIn(true);
        }
        return user;
      };
      
      checkAuth().then(async user=>{
        if(user){
          getHutIdByUserId();
        }
      });
    }, [loggedIn, props.user]);

    return (
      	<>{!form && !error && !success && 
          <Row className="justify-content-md-center">  
            <Col xs={6}>
              <div className="container-fluid myTable">
                <HikesTable hikes={hikes} setForm={setForm}  setHikeId={setHikeId}></HikesTable>
              </div>
            </Col>       
          </Row>
        }
        {form && !error && !success &&
          <Row className="justify-content-md-center">
              <Col></Col>
              <Col>
              <StatusForm setForm={setForm} hikeId={hikeId} hutId={hutId} setSuccess={setSuccess} setError={setError}/>
              </Col>
              <Col></Col>
          </Row>
        }

        {!form && error && <ErrorDisplay setError={setError} setForm={setForm} />}
        {!form && success && <SuccessDisplay setSuccess={setSuccess} setForm={setForm}/>}
        </>

    );
}

function HikesTable(props) {
    
    return (
        <Table hover className="table">
            <thead className="tableHeader">
              <tr>
                <th className = "hutTableHeader">NAME</th>
                <th className = "hutTableHeader">STATUS</th>
                <th className = "hutTableHeader">INFO</th>
                <th className = "hutTableHeader">UPDATE</th>
              </tr>
            </thead>
            <tbody>
                {
                  props.hikes.map((h, index) => {return <HikeRow key={index} hike={h} setForm={props.setForm} setHikeId={props.setHikeId}/>})
                }
            </tbody>
        </Table>
    );
}

function HikeRow(props) {
    const [show, setShow] = useState(false);
      return (
        <>
          <tr>
              <HikeData hike={props.hike} show={show} setShow={setShow} setForm={props.setForm} setHikeId={props.setHikeId}/>
          </tr>
          <tr></tr>
          <tr id={props.hike.id} className={show? "infoVisible" : "infoHidden"}>
              <td colSpan={10} className="extraInfo">
              {props.hike.description && <h6><b>Description</b></h6>}
              <p>{props.hike.description}</p>
              </td>
          </tr>
        </>
      );
  }

  function HikeData(props) {

    const activateForm = (hikeId) => {
      props.setForm(true); 
      props.setHikeId(hikeId);
    };

    return (
        <>
            <td style={{textAlign:'center'}}>{props.hike.name}</td>
            <td style={{textAlign:'center'}}>{props.hike.status}</td>
            <td style={{textAlign:'center'}}>
              <button className="btn" type="button" onClick={() => props.setShow(!props.show)}>
                <i className="bi bi-info-circle"></i>
              </button>
            </td>
            <td style={{textAlign:'center'}}>
              <button data-test="modify-button" className="btn" type="button" onClick={() => activateForm(props.hike.id)}>
                <i className="icons-style bi bi-pencil-square"></i>
              </button>
            </td>
        </>
    );
}
  
function StatusForm(props){

  const [condition, setCondition]=useState('open'); 
  const [description, setDescription]=useState(''); 
 
  const updateStatus = async (hutId, hikeId, condition, description) => {
      try {
          let params=({hutId:hutId, hikeId:hikeId, status:condition, description:description})
          let res = await API.updateStatus(params).then(res=>{return true}).catch(error=>{return false});
          return res;
      } catch (err) {
          console.log(err);
          return false;
      }

  };

  const handlerSubmit = async (e) => {
      e.preventDefault();
      props.setForm(false);
      let result = await updateStatus(props.hutId, props.hikeId, condition, description);

      if(result){
          props.setSuccess(true);
      }
      else{
          props.setError(true); 
      }

  };

  return(
            <Form onSubmit={handlerSubmit} className="link-form">
                <div className="hike-form-group">
                    <h2 className="text-center">Update Hut Status !</h2>
                    
                    <div className="form-group mt-3">
                        <Form.Group id="status-form" className="mb-3" controlId="condition">
                            <Form.Label><b>Status</b> <b className="asterisk-required">*</b></Form.Label>
                            <Form.Select required onChange={ev => { setCondition(ev.target.value); }}>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="partly blocked">Partly Blocked</option>
                                <option value="requires special gear">Requires Special Gear</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div id="description-form" className="form-group mt-3">
                        <Form.Group className="mb-3" controlId="hutDescription">
                            <Form.Label><b>Description</b></Form.Label>
                            <Form.Control as="textarea" rows={2} required
                                onChange={ev => { setDescription(ev.target.value); }}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="guideBtn" borderless="true">CONFIRM</Button>
                    </div>
                </div>
            </Form>
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
export { UpdateHutStatus };