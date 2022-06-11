import React from 'react'
import {Table, Col} from 'react-bootstrap';
import './Tabley.css';

export default function Tabley({data, capitulo, seccion}) {
  
  return (
      <Col xs={12}>
        <div className='p-1 d-flex justify-content-center fila-seccion bg-gradient'>
          <h5 className='text-light'>Seccion {seccion?seccion.id_seccion:''}: {seccion?seccion.titulo:''}</h5>
        </div>
        <div className='p-1 d-flex justify-content-center fila-capitulo bg-success bg-gradient'>
          <h5 className='text-light'>Capitulo {capitulo?capitulo.id:''}: {capitulo?capitulo.title: ''}</h5> 
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='col-1'>Código</th>
              <th className='col-1'>Nico</th>
              <th className='col-6'>Descripcion</th>
              <th className='col-1'>Unidad</th>
              <th className='col-1'>Imp</th>
              <th className='col-1'>Exp</th>
              <th className='col-1'>Count</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((item, i) => 
                <tr key={i} className={item.codigo.length < 5?'data-row':''}>
                  <td>{item.codigo}</td>
                  <td>{item.nico}</td>
                  <td>{item.nicoDescripcion}</td>
                  <td>{item.unidad}</td>
                  <td>{item.imp}</td>
                  <td>{item.exp}</td>
                  <td>{item.count}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </Col>
  )
}
