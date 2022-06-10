import React from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import {useState, useEffect} from 'react';

export default function CrearCapitulo({capitulos, seccion, func, statusCreate}) {
  const[ cTitle, setCTitle ] = useState('');
  const[ cNotasCap, setCNotasCap ] = useState('');
  const[ cNotasNac, setCNotasNac ] = useState('');
  const [cIdSeccion, setCIdSeccion] = useState('');
  const [cNumCap, setCNumCap] = useState('');

  const[uId, setUId] = useState('');
  const[ uTitle, setUTitle ] = useState('');
  const[ uNotasCap, setUNotasCap ] = useState('');
  const[ uNotasNac, setUNotasNac ] = useState('');
  const [uIdSeccion, setUIdSeccion] = useState('');

  const [dCapitulo, setDCapitulo] = useState('');

  const [alert, setAlert] = useState('');
  const [sUpdate, setSUpdate] = useState([]);

  useEffect(() => {
    if(statusCreate){
      setAlert('Se creó un nuevo capítulo!');
    }
  }, [statusCreate])

  useEffect(() =>{
    const data ={
      id:uId
    }
    const reqData = {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('https://av-server.herokuapp.com/select-update', reqData)
      .then(res => res.json())
      .then(a => setSUpdate(a))
      .catch(err => console.error(err))
  }, [uId])

  const handleCreate = e =>{
    e.preventDefault();

    const data = new FormData();
    data.append("id", cNumCap);
    data.append("descripcion", cTitle);
    data.append("nota_capitulo", cNotasCap);
    data.append("nota_nacional", cNotasNac);
    data.append("id_seccion", cIdSeccion);
    const reqData ={
      method:"POST",
      body: data
    }
    fetch('https://av-server.herokuapp.com/crear-capitulo', reqData)
      .then(res => res.json())
      .then(a => console.log(a))
      .catch(err => console.error(err))
  }

  const handleUpdate = e =>{
    e.preventDefault();

    const data = new FormData();
    data.append("id", uId);
    if(uTitle){
      data.append("descripcion", uTitle);
    }
    if(uNotasCap){
      data.append("nota_capitulo", uNotasCap);
    }
    data.append("nota_nacional", uNotasNac);
    if(uIdSeccion){
      data.append("id_seccion", uIdSeccion);
    }

    const reqData = {
      method:"POST",
      body: data
    }

    fetch('https://av-server.herokuapp.com/editar-capitulo', reqData)
      .then(res => res.json())
      .then(a => window.location.reload(true))
      .catch(err => console.error(err))
  }

  const handleDelete = e =>{
    let data = {id: dCapitulo}

    func(data, 'https://av-server.herokuapp.com/eliminar-capitulo');
  }

  console.log(uIdSeccion);

  return (
    <div>
      <Col xs={10} className="ms-3">
        <Form className='mb-4' onSubmit={e => handleCreate(e)} >
          <h4 className='h4 mb-3'>Crear Capitulo:</h4>
          {alert &&
            <Alert variant="success">
              <p>{alert}</p>
            </Alert>
          }

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Número de Capítulo</Form.Label>
            <Form.Control placeholder="Número de capitulo..." onChange={e => setCNumCap(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Titulo</Form.Label>
            <Form.Control placeholder="Titulo del capitulo..." onChange={e => setCTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Notas del Capitulo:</Form.Label>
            <Form.Control type='file' onChange={e => setCNotasCap(e.target.files[0])}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notas Nacionales:</Form.Label>
            <Form.Control type='file' onChange={e => setCNotasNac(e.target.files[0])}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Seccion perteneciente:</Form.Label>
            <Form.Select onChange={e => setCIdSeccion(e.target.value)}>
              <option value="">Seleccione una seccion</option>
              {
                seccion.map((item, i) =>
                  <option value={item.id} key={i}>{`${item.id}- ${item.titulo}`}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Button type='submit'>Crear</Button>
        </Form>

        <hr/>

        <Form className='mb-4' onSubmit={e => handleUpdate(e)}>
          <h4 className='h4 mb-3'>Editar Capitulo</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Capitulo:</Form.Label>
            <Form.Select onChange={e => setUId(e.target.value)}>
              <option value=''>Capitulo a editar...</option>
              {
                capitulos.map((item, i)=>
                  <option key={i} value={item.id}>{`${item.id}- ${item.descripcion}`}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          {
            uId.length > 0 &&
            <>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Editar Titulo:</Form.Label>
                <Form.Control defaultValue={sUpdate?sUpdate.descripcion:''} placeholder="Titulo del capitulo..." onChange={e => setUTitle(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Editar Notas de Capitulo:</Form.Label>
                <Form.Control type='file' onChange={e => setUNotasCap(e.target.files[0])}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Editar Notas Nacionales:</Form.Label>
                <Form.Control type='file' onChange={e => setUNotasNac(e.target.files[0])}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Editar Seccion Asociada:</Form.Label>
                <Form.Select defaultValue={sUpdate?sUpdate.id_seccion:''} onChange={e => setUIdSeccion(e.target.value)}>
                  <option value={sUpdate?sUpdate.id_seccion:''}>{`${sUpdate?sUpdate.id_seccion:''} - ${sUpdate?sUpdate.seccion.titulo:''}`}</option>
                  {
                    seccion.map((item, i) =>
                      <option value={item.id} key={i}>{`${item.id}- ${item.titulo}`}</option>
                    )
                  }
                </Form.Select>
              </Form.Group>
              <Button type='submit'>Editar</Button>
            </>
          }
        </Form>
        <hr/>
        <Form onSubmit={e => handleDelete(e)}>
          <h4>Eliminar Capitulo</h4>
          <Form.Group className='mb-3'>
            <Form.Label>Titulo:</Form.Label>
            <Form.Select onChange={e => setDCapitulo(e.target.value)}>
              <option value="">Capitulo a eliminar...</option>
              {
                capitulos.map((item, i) =>
                  <option value={item.id} key={i}>{`${item.id}- ${item.descripcion}`}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Button type='submit'>Eliminar</Button>
        </Form>
        <hr/>
      </Col>
    </div>
  )
}
