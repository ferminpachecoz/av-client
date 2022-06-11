import React from 'react';
import './Sidebar.css';

export default function Sidebar({capitulo}) {
  return (
    <div className='sidebar-container'>
      <ul className='navigation'>
        <li><a href="/nada"><button>Notas Seccion</button></a></li>
        <li><a target='_blank' href={capitulo?capitulo.nota_capitulo:'#'}><button>Notas Capítulo</button></a></li>
        <li><a href="/nada"><button>Notas Subpartida</button></a></li>
        <li><a href="/nada"><button>Notas Nacionales</button></a></li>
        <li><a href="/nada"><button>Notas Explicativas</button></a></li>
        <li><a href="/nada"><button>Fotos</button></a></li>
        <li><a href="/nada"><button>Videos</button></a></li>
      </ul>
    </div>
  )
}
