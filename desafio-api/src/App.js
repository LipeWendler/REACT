import React, { useState, useEffect } from "react"; //Import do React e Hooks
import './App.css'; //Vinculação com o CSS


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
    {/* DEFINIÇÃO DO HEADER ================================== */}
      <header className="header-Container">
        <strong className="header-Title">Bolsa de Volores - <span>ESTADOS UNIDOS</span></strong>
      </header>
    
      <div className="main-Container">

        {/* Pega info da API e retorna através os valores encontrados por key/value  ================== */}
        {api.map((item) => {
          return (
            <>
              <article className="stock-Card">
                <strong className="stock-Symbol">{item.symbol}</strong>
                <p className="stock-Desc white"><strong>Nome</strong>: {item.name}</p>
                <p className="stock-Desc white"><strong>Moeda</strong>: {item.currency}</p>
                <p className="stock-Desc white"><strong>Bolsa de Valores</strong>: {item.stockExchange}</p>
              </article>
            </>
          );
        })}

      </div>
    </>
  );
}