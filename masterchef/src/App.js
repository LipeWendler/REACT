import React, { useState, useEffect } from "react";
import api from './services/api';


export default function App() {

  const [recipe, setRecipe] = useState();

  useEffect(() => {
    api
      .get("http://localhost:3004/0")
      .then((response) => setRecipe(
        response))
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