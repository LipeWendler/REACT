import React, { useState, useEffect } from "react";
import api from './services/api';


export default function App() {

  const [recipe, setRecipe] = useState();

  useEffect(() => {
    api
      .get("/public/db/receitas.json")
      .then((response) => setRecipe(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <>
      <div className="App">
        <p>Usuário: {recipe?.nome}</p>
      </div>
    </>
  );
}