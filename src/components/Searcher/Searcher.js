import React from 'react';
import {Col, Row, Button, InputGroup, Form} from 'react-bootstrap';
import { useState } from 'react';

export default function Searcher(props) {
  const [frac, setFrac] = useState('');
  const [desc, setDesc] = useState('');

  const handleChange = e =>{
    e.preventDefault();
    props.func(frac, desc);
  }

  return (
    <Col xs={12}>
      <Form onSubmit={e => handleChange(e)}>
        <InputGroup>
          <Col xs={4}>
            <Form.Control placeholder='Buscar fraccion' onChange={e => setFrac(e.target.value)} />
          </Col>
          <Col xs={6}>
            <Form.Control placeholder='Buscar descripcion' onChange={e => setDesc(e.target.value)}/>
          </Col>
          <Button xs={2} type='submit' >Buscar</Button>
        </InputGroup>
      </Form>
    </Col>
  )
}
