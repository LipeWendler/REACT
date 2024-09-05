//IMPORTAÇÕES PARA FUNCIONAMENTO ======================================================================================
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConnection';

import { useNavigate } from 'react-router-dom';
import './card.css';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'

// FUNÇÃO PARA CRIAÇÃO DO COMPONENTE ==================================================================================
export default function Card() {
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

    //D - DELETE =====================================================
    async function excluirAtividade(id) {
        const atividadeDeletada = doc(db, "atividades", id);
        await deleteDoc(atividadeDeletada)
            .then(() => { alert("Ativiade removida com sucesso!") })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='card-main-container'>
            {/* Lista para exibir as atividades ---------------------------------------------------- */}
            <ul>
                {atividade.map(
                    (value) => (
                        <li key={value.id}>
                            <strong>ID: {value.id}</strong>
                            <span>Título: {value.titulo}</span>
                            <span>Autor: {value.autor}</span>
                            <button onClick={() => excluirAtividade(value.id)}>Excluir</button>
                        </li>
                    )
                )}
            </ul>
        </div>
    );


}

