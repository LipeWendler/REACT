//IMPORTAÇÕES PARA FUNCIONAMENTO ======================================================================================
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConnection';

import { useNavigate } from 'react-router-dom';
import './homeForm.css';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'


export default function HomeForm() {
    const [idAtividade, setIdAtividade] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState();
    const [status, setStatus] = useState('');

    const [atividade, setAtividade] = useState([]);

    const navigate = useNavigate();

    // Função para carregamento das atividades a serem feitas ---------------------------------------------------------
    useEffect(() => {
        async function carregarAtividades() {
            const dados = onSnapshot(collection(db, "atividades"), (snapshot) => {

                let listaAtividade = [];

                snapshot.forEach((doc) => {
                    listaAtividade.push(
                        {
                            id: doc.id,
                            titulo: doc.data().titulo,
                            descricao: doc.data().descricao
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
        await addDoc(collection(db, "atividades"), {
            titulo: titulo,
            descricao: descricao,
            prazo: prazo,
            status: status
        }).then(() => {
            alert("Atividade adicionada com sucesso!")
            setDescricao('');
            setTitulo('');
        }).catch((error) => {
            console.log(error);
        })
    }

    //R - READ =======================================================
    async function buscarAtividade() {
        const config = collection(db, "atividades");
        await getDocs(config).then((snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push(
                    {
                        id: doc.id,
                        titulo: doc.data().titulo,
                        descricao: doc.data().descricao
                    }
                );
            });

            setAtividade(lista);


        }).catch((error) => {
            console.log(error);
        })
    }

    //U - UPDATE =====================================================
    async function editarAtividade() {
        const postEditado = doc(db, "atividades", idAtividade);

        await updateDoc(postEditado, {
            titulo: titulo,
            descricao: descricao
        }).then(() => {
            alert("Atividade editada com sucesso!");
            setIdAtividade('');
            setTitulo('');
            setDescricao('');
        }).catch((error) => {
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