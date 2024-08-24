import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css';
import Header from "../../components/Header/header";



// Função para descrever os objetos por index dentro de um array.
function describeItems(array) {
  return array.map((array, index) => ( // Pega info do array e os indices
    <p className="description-items" key={index}><strong>{index + 1}.</strong> {array}</p> // Apresenta os dados do array separados por indice 
  ));
}

export default function Home() {

  const [api, setApi] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/receitas")
      .then((res) => setApi(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />

      <section className="home-section">
        <h1 className="home-title">Que tal tentar algo <span className="span">NOVO</span>?</h1>
        <h2 className="home-subtitle">Temos algumas ideias <span className="span">esperando</span> por <span className="span">você</span>!</h2>
      </section>


      <section className="recipes-section">
        <div className="main_container">
          {api.map((recipe) => {
            return (
              <>
                <article className="recipe-card">
                  <div className="title-container">
                    <strong className="recipe-title">{recipe.nome}</strong>
                  </div>

                  <div className="recipe-content">
                    <img className="recipe-image" src={recipe.image} alt={recipe.nome} />
                    <div className="description-container">
                      <div className="recipe-igredients">
                        <strong className="description-title">Ingredientes:</strong>
                        {describeItems(recipe.ingredientes)} {/* Uso da função "describeItems" para mostrar os ingredientes da receita*/}
                      </div>

                      <div className="recipe-method">
                        <strong className="description-title">Modo de Preparo:</strong>
                        {describeItems(recipe.modo_de_preparo)} {/* Uso da função "describeItems" para mostrar o modo de preparo da receita*/}
                      </div>
                    </div>
                  </div>
                </article>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}
