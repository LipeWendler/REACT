import { useState, useEffect } from 'react';
import { auth } from '../../firebaseConnection';

import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth'

export default function LoginForm2() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [usuario, setUsuario] = useState(false);
    const [detalhesUsuario, setDetalhesUsuario] = useState({});

    useEffect(() => {
        async function verificarLogin() {

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //tem usuario logado
                    setUsuario(true);
                    setDetalhesUsuario({
                        uid: user.uid,
                        email: user.email
                    })
                } else {
                    //não possui usuario logado
                    setUsuario(false);
                    setDetalhesUsuario({});
                }
            })

        }
        verificarLogin();
    }, [])

    async function novoUsuario() {
        await createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                alert("Usuário cadastrado com sucesso!")
                setEmail("");
                setSenha("");
            }).catch((error) => {
                if (error.code === 'auth/weak-password') {
                    alert("Senha muito fraca")
                } else if (error.code === 'auth/email-already-in-use') {
                    alert("Emailjá exitse!")
                }
            })
    }

    async function logarUsuario() {
        await signInWithEmailAndPassword(auth, email, senha)
            .then((value) => {
                alert("Usuário logado com sucesso!")

                setUsuario(true);
                setDetalhesUsuario({
                    uid: value.user.uid,
                    email: value.user.email,
                });

                setEmail("");
                setSenha("");
            })
            .catch(() => {
                alert("Erro ao fazer o login")
            })
    }

    async function fazerLogout() {
        await signOut(auth)
        setUsuario(false)
        setDetalhesUsuario({})
    }


    return (
        <div>
            <h1>GERENCIADOR DE TAREFAS</h1>

            {usuario && (
                <div>
                    <strong>Seja bem-vindo(a)</strong>
                    <br />
                    <span>ID: {detalhesUsuario.uid}</span>
                    <br />
                    <span>Email: {detalhesUsuario.email}</span>
                    <br />
                    <button onClick={fazerLogout}>Sair</button>
                </div>

            )}

            <h2>Login</h2>

            <label>Email:</label>
            <input
                type="email"
                placeholder="Digite um email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <label>Senha:</label>
            <input
                type="password"
                placeholder="Digite uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} />

            <button onClick={novoUsuario}>Cadastrar</button>
            <button onClick={logarUsuario}>Login</button>

        </div>
    );
}
