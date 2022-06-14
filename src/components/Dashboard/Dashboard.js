import React from 'react';
import {Tab, Row, Col, Nav} from 'react-bootstrap';
import CrearCapitulo from './CrearCapitulo';
import CrearSeccion from './CrearSeccion';
import CrearNico from './CrearNico';
import { useState, useEffect } from 'react';

export default function Dashboard() {

  const [data, setData] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const [create, setCreate] = useState(undefined);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/capitulos')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetch('/secciones')
      .then(res => res.json())
      .then(data => setSeccion(data))
      .catch(err => console.error(err))
  }, [])

  const postForm = (obj, url, event) =>{
    if(obj && url){
      if(event){
        event.preventDefault();
      }
      let reqData = {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }
      fetch(url, reqData)
        .then(res => res.json())
        .then(dat => dat.mensaje?setMensaje(dat.mensaje): setCreate(dat))
        .catch(err => console.error(err))
    }
  }

  const setting = (estado, funcion, event) =>{
    const name = event.target.name;
    const value = event.target.value;
    funcion({...estado, [name]: value})
  }

  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Crear Capitulo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Crear Seccion</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Agregar Nico</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <CrearCapitulo capitulos={data} seccion={seccion} func={postForm} statusCreate={create}/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <CrearSeccion seccion={seccion} funcion={postForm} setting={setting}/>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <CrearNico funcion={postForm} setting={setting} selectNico={create} mensaje={mensaje}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}
