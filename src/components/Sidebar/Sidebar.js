import React from 'react';
import './Sidebar.css';

export default function Sidebar({capitulo}) {
  return (
    <div className='sidebar-container'>
      <ul className='navigation'>
        <li><a href="#"><button>Notas Seccion</button></a></li>
        <li><a target='_blank' href={capitulo?capitulo.nota_capitulo:'#'}><button>Notas Capítulo</button></a></li>
        <li><a href="#"><button>Notas Subpartida</button></a></li>
        <li><a href="#"><button>Notas Nacionales</button></a></li>
        <li><a href="#"><button>Notas Explicativas</button></a></li>
        <li><a href="#"><button>Fotos</button></a></li>
        <li><a href="#"><button>Videos</button></a></li>
      </ul>
    </div>
  )
}
