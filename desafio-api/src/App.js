import React, { useState, useEffect } from "react";

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
        <header>

        </header>

        {api.map((item) => {
          return (
            <aside>
              <strong>{item.symbol}</strong>
              <p>{item.name}</p>
              <p>{item.currency}</p>
              <p>{item.stockExchange}</p>
              <p>{item.exchangeShortName}</p>
            </aside>
          );
        })}

      </div>
    </>
  );
}