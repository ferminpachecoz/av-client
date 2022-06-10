import React from 'react';
import Tabley from '../Tabley/Tabley';
import Searcher from '../Searcher/Searcher';
import Navbary from '../Navbary/Navbary';
import Sidebar from '../Sidebar/Sidebar';
import { useState, useEffect } from 'react';

export default function Home() {
  const [frac, setFrac] = useState('');
  const [desc, setDesc] = useState('')
  const [data, setData] = useState([]);

  const func = (a,b) =>{
    setFrac(a);
    setDesc(b);
  }

  useEffect(() =>{
    fetch(`https://av-server.herokuapp.com/query?name=${frac}&descripcion=${desc}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
  }, [frac, desc])

  return (
    <>
      <Navbary />
      <div className='row g-0'>
        <Sidebar capitulo={data.capitulo} />
        <div className='col-10'>
          <Searcher func={func}/>
          <Tabley data={data.nico} capitulo={data.capitulo} seccion={data.seccion} />
        </div>
      </div>
    </>
  )
}
