import React, { useState, useEffect } from "react";
import './App.css';


export default function App() {
  const [api, setApi] = useState([]);

  useEffect(() => {
    let url = 'https://financialmodelingprep.com/api/v3/search-name?query=META&limit=10&exchange=NASDAQ&apikey=O0sThOVzIeU7AlYn3pi3w7kSxYxALMfN'; //Variável com a URL do site para consumo
    fetch(url) //Manda a requisição para o site
      .then((r) => r.json()) //Recebe a resposta da requisição no formato JSON
      .then((json) => setApi(json)) //Salvando o JSON na constante criada pelo método set
  }, []);

  return (
    <>
      <header className="header-Container">
        <strong className="header-Title">Companias da Bolsa de Volores - <span>EUROPA</span></strong>
      </header>

      <div className="main-Container">

        {api.map((item) => {
          return (
            <>
              <article className="stock-Card">
                <strong className="stock-Symbol">{item.symbol}</strong>
                <p className="stock-Name white"><strong>Nome</strong>: {item.name}</p>
                <p className="stock-Currency white"><strong>Moeda</strong>: {item.currency}</p>
                <p className="stock-Exchange white"><strong>Bolsa de Valores</strong>: {item.stockExchange}</p>
              </article>
            </>
          );
        })}

      </div>
    </>
  );
}