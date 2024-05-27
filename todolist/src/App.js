import React, { useEffect, useState, useMemo } from 'react';
import "./App.css"

function App() {
  const [tarefas, setTarefas] = useState([]);

  const [input, setInput] = useState('');

  const [numero, setNumero] = useState(0);

  const calculo = useMemo(() => {
    let resultado = 0;
    for (let i = 0; i < numero * 1000; i++) {
      resultado += i;
    }
    return resultado;
  }, [numero]);

  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas');

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }, [tarefas]);

  function adicionarTarefa() {
    setTarefas([...tarefas, input]);
    setInput('');
  }
  return (
    <>
      <div>
        <ul className='lista'>
          {tarefas.map(tarefa => (
            <li key={tarefa}> {tarefa} </li>
          ))}
        </ul>

        <input className='texto' type='text' value={input} onChange={e => setInput(e.target.value)} />
        <button className='botao' type='button' onClick={adicionarTarefa}>Adicionar</button>
      </div>
      <div>
        <p>Número: {numero}</p>
        <p>Resultado do cálculo: {calculo}</p>
        <button className='botao' onClick={()=> setNumero(numero+1)}>Incrementar</button>
        <button className='botao-reset' onClick={()=> setNumero(0)}>Reset</button>
      </div>
    </>
  )
}

export default App;