import React, { useEffect, useState } from 'react';

import './App.css';

export default function App(){
  const [nutri, setNutri] = useState([]);

  useEffect(()=>{
    let url = 'https://sujeitoprogramador.com/rn-api/?api=posts'; //Variável com a URL do site para consumo
    fetch(url) //Manda a requisição para o site
    .then((r)=> r.json()) //Recebe a resposta da requisição no formato JSON
    .then((json) => setNutri(json)) //Salvando o JSON na constante criada pelo método set
  }, []);

  return(
    <>
      <div className='mainContainer'>
        <header>
          <strong className='pageTitle'>React Nutri</strong>
        </header>

        {nutri.map((item)=>{
          return(
            <article className='cardContainer' key={item.id}>
              <strong className='cardTitle' >{item.titulo}</strong>
              <img className='cardImage' src={item.capa} alt={item.titulo}/>
              <p className='cardSubtitle'>{item.subtitulo}</p>
              <button className='cardButton'>Acessar</button>
            </article>
          );
        })}
      </div>
    
    
    </>
  );
  
}