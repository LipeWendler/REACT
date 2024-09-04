//IMPORTAÇÕES PARA FUNCIONAMENTO ======================================================================================
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConnection';

import { useNavigate } from 'react-router-dom';

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

    //C - CREATE =====================================================
    async function addAtividade() {
        await addDoc(collection(db, "atividades"), {
            titulo: titulo,
            descricao: descricao,
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

    //D - DELETE =====================================================
    async function excluirAtividade(id) {
        const atividadeDeletada = doc(db, "atividades", id);
        await deleteDoc(atividadeDeletada)
            .then(() => { alert("Ativiade removida com sucesso!")})
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>GERENCIADOR DE ATIVIDADES</h1>
            {/* ÁREA POSTS ============================================================ */}
            <h2>Adicione uma nova atividade!</h2>

            <label>Título:</label>
            <textarea
                type="text"
                placeholder="Título da Atividade"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)} />

            <label>Descrição:</label>
            <input
                type="text"
                placeholder="Descricao da atividade"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)} />

            <button onClick={addAtividade}>Inserir</button>
            <button onClick={buscarAtividade}>Buscar</button>
            <button onClick={editarAtividade}>Editar</button>

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

