import { Col, Row, Table, ListGroup, Form, Button, Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from "../API";



function LinkHutToHike(props) {
    const [form, setForm]=useState(false);
    const [huts, setHuts]=useState([]); 
    const getHuts = async () => {
        //const huts = await API.getHuts(currentUserId);
        const hutsList = [{id: 1, name:"prova 1", latitude: "1", longitude: "1", country:"Italy", province:"Turin", town:"Turin", altitude: "1000", beds:"1", food: "None", description:"hello"}, {id: 2, name:"prova 1", latitude: "1", longitude: "1", country:"Italy", province:"Turin", town:"Turin", altitude: "1000", beds:"1", food: "None", description:"hello"} ]
        setHuts(hutsList);
    };

    useEffect(() => {
            getHuts();
      },[]);

    return (

        <div className="container-fluid myTable">
            <HutsTable huts={huts} form={form}></HutsTable>
        </div>

    );
}

function HutsTable(props) {
    
    return (
        <Table hover className="table">
            <thead className="tableHeader">
              <tr>
                <th style={{width:'17%'}}>NAME</th>
                <th style={{width:'32%'}}>COORDINATES</th>
                <th style={{width:'16%'}}>COUNTRY</th>
                <th style={{width:'10%'}}>PROVINCE</th>
                <th style={{width:'16%'}}>TOWN</th>
                <th style={{width:'16%'}}>INFO</th>
                {props.form && <th style={{width:'6%'}}></th>}
              </tr>
            </thead>
            <tbody>
                {
                  props.huts.map((h, index) => {console.log(h, index); return <HutRow key={index} hut={h} form={props.form}/>})
                }
            </tbody>
        </Table>
    );
}

function HutRow(props) {
    const [show, setShow] = useState(false);
    console.log(props)
    console.log(props.hut)
    console.log(props.hut.id)

      return (
        <>
          <tr>
              <HutData hut={props.hut} show={show} setShow={setShow} form={props.form}/>
          </tr>
          <tr></tr>
          <tr id={props.hut.id} className={show? "infoVisible" : "infoHidden"}>
              <td colSpan={7} className="extraInfo">
              <p><h6><b>Altitude:</b></h6>{props.hut.altitude}</p>
              <p><h6><b>Beds:</b></h6>{props.hut.beds}</p>
              <p><h6><b>Food:</b></h6>{props.hut.food}</p>
              <h6><b>Description</b></h6>
              <p>{props.hut.description}</p>
              </td>
          </tr>
        </>
      );
  }

  function HutData(props) {

    return (
        <>
            <td>{props.hut.name}</td>
            <td>{props.hut.latitude},{props.hut.longitude}</td>
            <td>{props.hut.country}</td>
            <td>{props.hut.province}</td>
            <td>{props.hut.town}</td>
            <td>
              <button className="btn" type="button" onClick={(x) => props.setShow(!props.show)}>
                <i className="bi bi-info-circle"></i>
              </button>
            </td>
        </>
    );
}
  



export { LinkHutToHike };