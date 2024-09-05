//IMPORTAÇÕES PARA FUNCIONAMENTO ======================================================================================
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConnection';

import { useNavigate } from 'react-router-dom';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { signOut } from 'firebase/auth';

export default function HomeForm() {
    const [idAtividade, setIdAtividade] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState();
    const [status, setStatus] = useState('');

    const [atividade, setAtividade] = useState([]);

    const [usuario, setUsuario] = useState(false);
    const [detalhesUsuario, setDetalhesUsuario] = useState({});

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

    async function fazerLogout() {
        await signOut(auth)
        setUsuario(false)
        setDetalhesUsuario({})
    }

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

    return (
        <div className="homeForm-main-container">


            {/* ÁREA POSTS ============================================================ */}
            < h2 > Adicione uma nova atividade!</h2 >

            <div className='homeForm-form-container'>
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
            </div>
        </div>
    );
}