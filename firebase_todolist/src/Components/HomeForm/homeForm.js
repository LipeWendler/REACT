//IMPORTAÇÕES PARA FUNCIONAMENTO ======================================================================================
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConnection';

import { useNavigate } from 'react-router-dom';
import './homeForm.css';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore'

export default function HomeForm() {
    const [idAtividade, setIdAtividade] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState();
    const [status, setStatus] = useState('');

    const [atividade, setAtividade] = useState([]);

    const navigate = useNavigate();

    // Função para carregamento das atividades ---------------------------------------------------------
    useEffect(() => {
        async function carregarAtividades() {
            const dados = onSnapshot(collection(db, "atividades"), (snapshot) => {

                let listaAtividade = [];

                snapshot.forEach((doc) => {
                    listaAtividade.push(
                        {
                            id: doc.id,
                            titulo: doc.data().titulo,
                            descricao: doc.data().descricao,
                            prazo: doc.data().prazo,
                            status: doc.data().status
                        }
                    );
                });
                setAtividade(listaAtividade);
            })
        }
        carregarAtividades();
    }, [])

    //C - CREATE =====================================================
    async function addAtividade() {
        // Cria nova atividade com base nos dados informados pelo formulário da página Home 
        await addDoc(collection(db, "atividades"), {
            titulo: titulo,
            descricao: descricao,
            prazo: prazo,
            status: status
        }).then(() => { // Atividade criada, limpa as variáveis 
            alert("Atividade adicionada com sucesso!")
            setDescricao('');
            setTitulo('');
            setPrazo();
            setStatus('');
        }).catch((error) => { // Se der errado, printa erro no console
            console.log(error);
        })
    }

    //R - READ =======================================================
    async function buscarAtividade() {
        // Pega a collection em que estão as atividades
        const config = collection(db, "atividades");
        // Coleta os registros da colection
        await getDocs(config).then((snapshot) => {
            let lista = [];

            // Adiciona os registros dentro de uma lista
            snapshot.forEach((doc) => {
                lista.push(
                    {
                        id: doc.id,
                        titulo: doc.data().titulo,
                        descricao: doc.data().descricao,
                        prazo: doc.data().prazo,
                        status: doc.data().status
                    }
                );
            });
            // Define as atividades para exibição
            setAtividade(lista);

        }).catch((error) => { // Se der errado, printa erro no console
            console.log(error);
        })
    }

    //U - UPDATE =====================================================
    async function editarAtividade() {
        // Encontrar a atividade pelo título
        const querySnapshot = await getDocs(query(collection(db, "atividades"), where("titulo", "==", titulo)));

        // Caso não existe atividade com o titulo informado
        if (querySnapshot.empty) {
            alert("Atividade não encontrada!");
            return;
        }

        // Pega o ID da atividade encontrada com base no título (título precisa ser único)
        const atividade = querySnapshot.docs[0];
        const idAtividadeEditada = atividade.id;

        // Encontra os dados da atividade a ser editada
        const atividadeEditada = doc(db, "atividades", idAtividadeEditada);

        // Atualiza os dados da atividade
        await updateDoc(atividadeEditada, {
            descricao: descricao,
            prazo: prazo,
            status: status
        }).then(() => { // Atividade atualizada, limpa as variáveis
            alert("Atividade editada com sucesso!");
            setIdAtividade('');
            setTitulo('');
            setDescricao('');
            setPrazo();
            setStatus('');
        }).catch((error) => { // Se der errado, printa erro no console
            console.log(error);
        })
    }

    return (
        <div className="homeForm-main-container">
            {/* ÁREA ATIVIDADES ============================================================ */}
            <div className='homeForm-form-container'>
                <div id='inputs-container'>
                    <div id='title-container'>
                        <label>Título:</label>
                        <input
                            type="text"
                            placeholder="Título da Atividade"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} />
                    </div>

                    <div id='prazo-container'>
                        <label>Prazo:</label>
                        <input
                            type="date"
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)} />
                    </div>

                    <div id='status-container'>
                        <label>Status:</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value='Pendente'>Pendente</option>
                            <option value='Em andamento'>Em andamento</option>
                            <option value='Finalizada'>Finalizada</option>
                            <option value='Atrasada'>Atrasada</option>
                        </select>
                    </div>

                    <div id='description-container'>
                        <label>Descrição:</label>
                        <textarea className='description-textarea'
                            type="text"
                            placeholder="Descricao da atividade"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)} />
                    </div>
                </div>

                <div className='homeForm-button-container'>
                    <button className='insert-button' onClick={addAtividade}>Inserir</button>
                    <button className='search-button' onClick={buscarAtividade}>Buscar</button>
                    <button className='edit-button' onClick={editarAtividade}>Editar</button>
                </div>
            </div>
        </div>
    );
}