//IMPORTAÇÕES PARA FUNCIONAMENTO ======================================================================================
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConnection';

import { useNavigate } from 'react-router-dom';
import './card.css';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'

// FUNÇÃO PARA CRIAÇÃO DO COMPONENTE ==================================================================================
export default function Card() {
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
                            <h2 className='atividade-title'> {value.titulo}</h2>
                            <div className='atividade-info-container'>
                                <span className='atividade-span'><strong>Status:</strong> {value.status}</span>
                                <span className='atividade-span'><strong>Descricao:</strong> {value.descricao}</span>
                                <span className='atividade-span'><strong>Prazo:</strong> {value.prazo}</span>

                                <button className='delete-button' onClick={() => excluirAtividade(value.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

