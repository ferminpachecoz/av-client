import React from 'react'
import { Form, Button, Col, InputGroup, Alert } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';

function CrearNico({setting, funcion, selectNico, mensaje}) {
  
  const [nicoC, setNicoC] = useState({});
  const [nicoU, setNicoU] = useState({});
  const [nicoD, setNicoD] = useState({});

  return (
    <div>
      <Col xs={10}>
        <Form onSubmit={() => funcion(nicoC, 'https://av-server.herokuapp.com/crear-nico')}>
          <h4>Crear Registro NICO</h4>
          <Form.Group className='mb-3'>
            <Form.Label>Código:</Form.Label>
            <Form.Control placeholder='Introducir código...' name="codigo" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>NICO</Form.Label>
            <Form.Control placeholder='Introducir NICO...' name="nico" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Descripcion:</Form.Label>
            <Form.Control placeholder='Introducir descripcion...' name="descripcion" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Unidad:</Form.Label>
            <Form.Control placeholder='Introducir unidad...' name="unidad" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Importacion (%)</Form.Label>
            <Form.Control placeholder='Introducir % de importacion...' name="imp" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Exportacion (%)</Form.Label>
            <Form.Control placeholder='Introducir % de exportacion...' name="exp" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control placeholder='Introducir cantidad...' name="count" onChange={e => setting(nicoC, setNicoC, e)}/>
          </Form.Group>

          <Button type='submit'>Crear</Button>
        </Form>

        <hr/>
        
        <Form onSubmit={e => funcion(nicoU, 'https://av-server.herokuapp.com/buscar-nico', e)}>
          <h4>Editar Registro NICO</h4>
          <Form.Group className='mb-3'>
            <Form.Label>Código:</Form.Label>
            <InputGroup>
              <Form.Control placeholder='Introducir código...' name="codigo" onChange={e => setting(nicoU, setNicoU, e)}/>
              <Button type='submit'>Buscar</Button>
            </InputGroup>
          </Form.Group>
        </Form>
        {selectNico &&
          <Form onSubmit={e => funcion(nicoU, 'https://av-server.herokuapp.com/editar-nico', e)}>
            <Form.Group className='mb-3'>
              <Form.Label>NICO</Form.Label>
              <Form.Control defaultValue={selectNico.nico} placeholder='Introducir NICO...' name="nico" onChange={e => setting(nicoU, setNicoU, e)}/>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Descripcion:</Form.Label>
              <Form.Control defaultValue={selectNico.descripcion} placeholder='Introducir descripcion...' name="descripcion" onChange={e => setting(nicoU, setNicoU, e)}/>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Unidad:</Form.Label>
              <Form.Control defaultValue={selectNico.unidad} placeholder='Introducir unidad...' name="unidad" onChange={e => setting(nicoU, setNicoU, e)}/>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Importacion (%)</Form.Label>
              <Form.Control defaultValue={selectNico.imp} placeholder='Introducir % de importacion...' name="imp" onChange={e => setting(nicoU, setNicoU, e)}/>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Exportacion (%)</Form.Label>
              <Form.Control defaultValue={selectNico.exp} placeholder='Introducir % de exportacion...' name="exp" onChange={e => setting(nicoU, setNicoU, e)}/>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control defaultValue={selectNico.count} placeholder='Introducir cantidad...' name="count" onChange={e => setting(nicoU, setNicoU, e)}/>
            </Form.Group>

            <Button type='submit'>Editar</Button>
          </Form>
        }
        <Form onSubmit={e => funcion(nicoD, 'https://av-server.herokuapp.com/eliminar-nico', e)}>
          <h4>Eliminar Registro NICO</h4>
          {mensaje && <Alert variant='success'><p>{mensaje}</p></Alert>}
          <Form.Group className='mb-3'>
            <Form.Label>Código:</Form.Label>
            <InputGroup>
              <Form.Control placeholder='Introducir código...' name="codigo" onChange={e => setting(nicoD, setNicoD, e)} />
              <Button type='submit'>Buscar</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>
    </div>
  )
}


export default CrearNico;