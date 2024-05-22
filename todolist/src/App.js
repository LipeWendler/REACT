import React, { useEffect, useState } from 'react';

function App(){
  const [tarefas, setTarefas] = useState([]);

  const [input, setInput] = useState('');

  useEffect(() =>{
    const tarefasStorage = localStorage.getItem('tarefas');

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  },[tarefas]);

  function adicionarTarefa(){
    setTarefas([...tarefas, input]);
    setInput('');
  }
return(
  <div>
    <ul className='lista'>
      {tarefas.map(tarefa => (
      <li key={tarefa}> {tarefa} </li>
      ))}
    </ul>

    <input className='texto' type='text' value={input} onChange={e => setInput(e.target.value)}/>
    <button  className='botao' type='button' onClick={adicionarTarefa}>Adicionar</button>
  </div>
)
}

export default App;