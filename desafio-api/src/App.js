import React, { useState, useEffect } from "react";
import './App.css';


export default function App() {
  const [api, setApi] = useState([]);

  useEffect(() => {
    let url = 'https://financialmodelingprep.com/api/v3/symbol/available-euronext?apikey=zGyqH52x41YGhf6M07mqSIU0V6jb5UG9'; //Variável com a URL do site para consumo
    fetch(url) //Manda a requisição para o site
      .then((r) => r.json()) //Recebe a resposta da requisição no formato JSON
      .then((json) => setApi(json)) //Salvando o JSON na constante criada pelo método set
  }, []);

  return (
    <>
      <div>
        <header className="header-Container">
          <strong className="header-Title">Companias da Bolsa de Volores - <span>EUROPA</span></strong>
          <nav className="navbar-Container">
            <button className="navbar-item">Início</button>
          </nav>
        </header>

        {api.map((item) => {
          return (
            <>
              <div className="stock-Container">
                <article className="stock-Card">
                  <strong className="stock-Symbol">{item.symbol}</strong>
                  <p className="stock-Name">Nome: {item.name}</p>
                  <p className="stock-Currency">Moeda: {item.currency}</p>
                  <p className="stock-Exchange">Bolsa de Valores: {item.stockExchange}</p>
                </article>
              </div>
            </>
          );
        })}

      </div>
    </>
  );
}