import React from 'react'
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';

export default function CrearSeccion({seccion}) {

  const [titleC, setTitleC] = useState('');
  const [notaSecC, setNotaSecC] = useState('');

  const [idU, setIdU] = useState('')
  const [titleU, setTitleU] = useState('');
  const [notaSecU, setNotaSecU] = useState('');

  const [idD, setIdD] = useState('');
  const [statusD, setStatusD] = useState({})

  const handleCreate = (event) =>{
    event.preventDefault();

    const data = new FormData();
    data.append("title", titleC);
    data.append("nota_seccion", notaSecC);

    const reqData={
      method:"POST",
      body: data
    }

    fetch('https://av-server.herokuapp.com/crear-seccion', reqData)
      .then(res => res.json())
      .then(a => console.log(a))
      .catch(err => console.error(err))

  }

  const handleUpdate = e =>{
    e.preventDefault();

    const data = new FormData();
    data.append("id", idU);
    data.append("title", titleU);
    data.append("nota_seccion", notaSecU);

    const reqData={
      method:"POST",
      body: data
    }

    fetch('https://av-server.herokuapp.com/editar-seccion', reqData)
      .then(res => res.json())
      .then(a => console.log(a))
      .catch(err => console.error(err))
  }

  const handleDelete = e =>{
    e.preventDefault();

    const data = {
      id: idD
    }
    const reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('https://av-server.herokuapp.com/eliminar-seccion', reqData)
      .then(res => res.json())
      .then(a => setStatusD(a.status + 1))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <Col xs={10} className="ms-3">
        <Form onSubmit={e => handleCreate(e)}>
          <h4 className='mb-3'>Crear Sección</h4>
          <Form.Group className='mb-3'>
            <Form.Label>Titulo:</Form.Label>
            <Form.Control name='titulo' placeholder='Titulo de seccion...' onChange={e => setTitleC(e.target.value)}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Nota Seccion:</Form.Label>
            <Form.Control name='nota_seccion' type='file' onChange={e => setNotaSecC(e.target.files[0])}/>
          </Form.Group>
          <Button type='submit'>Crear</Button>
        </Form>

        <hr/>

        <Form onSubmit={e => handleUpdate(e)}>
          <h4 className='mb-3'>Editar Sección</h4>
          <Form.Group className='mb-3'>
            <Form.Label>Titulo:</Form.Label>
            <Form.Select name='id' className='mb-3' onChange={e => setIdU(e.target.value)}>
              <option value="">Sección a editar...</option>
              {
                seccion.map((item, i) =>
                  <option value={item.id} key={i}>{`${item.id}- ${item.titulo}`}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Editar Titulo:</Form.Label>
            <Form.Control name='titulo' placeholder='Titulo de seccion...' onChange={e => setTitleU(e.target.value)}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Nota Seccion:</Form.Label>
            <Form.Control name='nota_seccion' type='file' onChange={e => setNotaSecU(e.target.files[0])}/>
          </Form.Group>
          <Button type="submit">Editar</Button>
        </Form>

        <hr/>
        {statusD.status &&
          <Alert variant='success'>
            <h5>Se elimino correctamente!</h5>
          </Alert>
        }
        <Form onSubmit={e => handleDelete(e)}>
          <h4 className='mb-3'>Eliminar Sección</h4>
          <Form.Group className='mb-3'>
            <Form.Label>Titulo:</Form.Label>
            <Form.Select name='id' onChange={e => setIdD(e.target.value)} >
              <option value="">Sección a eliminar...</option>
              {
                seccion.map((item, i) => 
                  <option value={item.id} key={i}>{`${item.id}- ${item.titulo}`}</option>
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
