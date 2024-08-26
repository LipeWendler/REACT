import React, { useState } from "react";
import './recipes.css';
import api from "../../services/api";

// Função para descrever os objetos por index dentro de um array.
function describeItems(array) {
    return array.map((array, index) => ( // Pega info do array e os indices
        <p className="description-items" key={index}><strong>{index + 1}.</strong> {array}</p> // Apresenta os dados do array separados por indice 
    ));
}

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    // Função assincrona para coletar as info do JSON
    async function loadRecipes() {
        const response = await api.get('http://localhost:3004/receitas')
        setRecipes(response.data)
    }

    loadRecipes();

    return (
        <>
            <section className="recipes-section">
                <div className="main_container">
                    {recipes.map((recipe) => {
                        return (
                            <>
                                <article id={recipe.id} className="recipe-card">
                                    <div className="title-container">
                                        <strong className="recipe-title">{recipe.nome}</strong>
                                    </div>

                                    <div className="recipe-content">
                                        <img className="recipe-image" src={recipe.image} alt={recipe.nome} />
                                        <div className="description-container">
                                            <div className="recipe-igredients">
                                                <strong className="description-title">Ingredientes:</strong>
                                                {describeItems(recipe.ingredientes)} {/* Uso da função "describeItems" para listar os ingredientes da receita*/}
                                            </div>

                                            <div className="recipe-method">
                                                <strong className="description-title">Modo de Preparo:</strong>
                                                {describeItems(recipe.modo_de_preparo)} {/* Uso da função "describeItems" para listar o modo de preparo da receita*/}
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
    )
}