// IMPORTAÇÕES PARA FUNCIONAMENTO ==========================================================
import React, { useState, useEffect } from "react";
import { db, auth } from '../../firebaseConnection';

import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// COMPONENTE DO FORMULÁRIO DE LOGIN =======================================================
export function LoginForm() {
    const [user, setUser] = useState(false);
    const [detailUser, setDetailUser] = useState({});

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    // Função para criar um novo Usuário --------------------------------------------------
    async function createUser() {
        await createUserWithEmailAndPassword(auth, email, password)
            // Cadastro efetuado, dispara alert e limpa variáveis
            .then(() => {
                alert('Usuário cadastrado com sucesso!')
                setEmail('');
                setPassword('');
            })
            // Verificações e alertas para alteração
            .catch((error) => {
                // Verifica nivel da senha
                if (error.code === 'auth/week-password') {
                    alert('Senha muito fraca!')
                }
                // Verifica se email já cadastrado
                else if (error.code === 'auth/email-already-in-use') {
                    alert('Email já cadastrado!')
                }
            })
    }

    // Função para login do Usuário -----------------------------------------------------
    async function loginUser() {
        await signInWithEmailAndPassword(auth, email, password)
            // Após usuário logado com sucesso
            .then((value) => {
                alert('Login realizado com sucesso!')
                setUser(true);
                setDetailUser({
                    uid: value.user.uid,
                    email: value.user.email
                });
                // Limpa as variáveis
                setEmail('');
                setPassword('');
            })
            // Caso erro no login
            .catch(() => {
                alert('Erro ao realizar o login');
            })
    }

    // Função para sair do Usuário -------------------------------------------------------
    async function logOutUser() {
        await signOut(auth)
        setUser(false);
        setDetailUser({});
    }

    // Função para verificar dados do Usuário ----------------------------------------------
    useEffect(() => {
        async function verifyLogin() {
            // Função Firebase para verificar login
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //Tem usuário logado
                    setUser(true);
                    setDetailUser({
                        uid: user.uid,
                        email: user.email
                    });
                }
                else {
                    //Não possui usuário logado
                    setUser(false);
                    setDetailUser({})
                }
            })
        }
        // Ativa a função para verificação
        verifyLogin();
    }, [])

    // ESTRUTURA VISUAL DA PÁGINA ===========================================================
    return (
        <>
            {/* Container Geral do Formulário --------------------------------------------*/}
            <div className="main-container">
                {/* Formulário de Login */}
                <form className="login-form">
                    {/* Label e Input do Email do usuário */}
                    <label className="email-label label">Email: </label>
                    <input className="email-input input"
                        placeholder="Digite seu email"
                        type="email" />

                    {/* Label e Input da Senha do usuário */}
                    <label className="password-label label">Senha: </label>
                    <input className="password-input input"
                        placeholder="Digite sua senha"
                        type="password" />

                    {/* Button para logar usuário existente */}
                    <button className="login-button button" onClick={loginUser}>Entrar</button>
                </form>

                {/* Formulário de Cadastramento */}
                <form className="login-form">
                    {/* Label e Input do Email do usuário */}
                    <label className="email-label label">Email: </label>
                    <input className="email-input input"
                        placeholder="Digite seu email"
                        type="email" />

                    {/* Label e Input da Senha do usuário */}
                    <label className="password-label label">Senha: </label>
                    <input className="password-input input"
                        placeholder="Digite sua senha"
                        type="password" />

                    {/* Button para logar usuário existente */}
                    <button className="login-button button" onClick={createUser}>Entrar</button>
                </form>
            </div>
        </>
    )
}