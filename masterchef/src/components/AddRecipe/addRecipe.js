import React, { useState } from "react";
import api from "../../services/api";
import './addRecipe.css';

export default function AddRecipe() {
    const [recipes, setRecipes] = useState([]);

    // Função assincrona para carregar os dados do arquivo JSON
    async function loadRecipes() {
        const response = await api.get('http://localhost:3004/receitas') //Pega os dados do arquivo JSON
        setRecipes(response.data) //Salva os dados na constante recipes
    }

    // Função assincrona para adicionar uma nova receita
    async function newRecipe(event) {
        event.preventDefault();

        // Coletando dados da nova receita pelo formulário
        const nome = document.getElementById('nome').value;
        const ingredientes = document.getElementById('ingredientes').value.split(','); // Split serve para fracionar o dado no caracter especificado
        const modoDePreparo = document.getElementById('modoDePreparo').valu.split(',');
        const image = document.getElementById('image').value;

        // Carrega as receitas já salvas
        const receitas = await loadRecipes();

        // Criando objeto com a nova receita
        const receitaNova = {
            id: 6,
            nome: nome,
            ingredientes: ingredientes,
            modo_de_preparo: modoDePreparo,
            image: image
        };

        // Adicionando a nova receita ao arquivo JSON
        receitas.push(receitaNova);
    }

    // Submit ao confirmar adição
    window.onload = function () {
        document.getElementById('add-form').addEventListener('submit', newRecipe);
    }


    return (
        <div className="add-container">
            <div className="add-title-container">
                <h1 className="add-title-text">Quem nunca aprendeu aquela <span className="span">receita</span> especial  da <span className="span">avó</span>?</h1>
            </div>

            <div className="add-subtitle-container">
                <h2 className="add-subtitle-text"><span className="span">Compatilhe</span> ela conosco!</h2>
            </div>

            <form className="add-form">
                <div className="input-container">
                    <label className="input-title">Nome da Receita: </label>
                    <input className="input" type="text" id="nome" placeholder="Bolo de Chocolate" />
                </div>
                <div className="input-container">
                    <label className="input-title">Ingredientes (separados por vírgula): </label>
                    <input className="input" type="text" id="ingredientes" placeholder="2 ovos, 1kg de farinha, etc..." />
                </div>
                <div className="input-container">
                    <label className="input-title">Modo de preparo (etapas separadas por vírgula): </label>
                    <input className="input" type="text" id="modoDePreparo" placeholder="Esquentar o forno a 180°, misturar tudo, etc... " />
                </div>

                <label>Imagem (informa a URL): </label>
                <input type="text" id="image" placeholder="https://urldaimagem.com" />
            </form>
        </div>
    )
}
