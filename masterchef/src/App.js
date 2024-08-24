import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


export default function App() {

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/receitas")
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <header className="header-container">
        <strong className="header-title">RECEITAS <span>DA</span> CLEIDE</strong>
      </header>

      <div className="main_container">
        {recipe.map((recipe) => {
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
                      <strong className="description-title">Igredientes:</strong>
                      <p className="description-items">{recipe.ingredientes}</p>
                    </div>
                    <div className="recipe-method">
                      <strong className="description-title">Modo de Preparo:</strong>
                      <p className="description-items">{recipe.modo_de_preparo}</p>
                    </div>
                  </div>
                </div>
              </article>
            </>
          );
        })}
      </div>
    </>
  );
}