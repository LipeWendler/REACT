// IMPORTAÇÕES PARA FUNCIONAMENTO ==========================================================
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import './loginForm.css';

// COMPONENTE DO FORMULÁRIO DE LOGIN =======================================================
export function LoginForm() {
    const navigate = useNavigate();

    const [user, setUser] = useState(false);
    const [detailUser, setDetailUser] = useState({});

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // Função para criar um novo Usuário --------------------------------------------------
    async function createUser() {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Usuário cadastrado com sucesso!")
                setEmail("");
                setPassword("");
            }).catch((error) => {
                if (error.code === 'auth/weak-password') {
                    alert("Senha muito fraca")
                } else if (error.code === 'auth/email-already-in-use') {
                    alert("Emailjá exitse!")
                }
            })
    }

    // Função para login do Usuário -----------------------------------------------------
    async function loginUser() {
        await signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                alert("Usuário logado com sucesso!")

                setUser(true);
                setDetailUser({
                    uid: value.user.uid,
                    email: value.user.email,
                });

                setEmail("");
                setPassword("");
            })
            .catch(() => {
                alert("Erro ao fazer o login")
            })
    }

    // Função para sair do Usuário -------------------------------------------------------
    async function logOutUser() {
        await signOut(auth)
        setUser(false)
        setDetailUser({})
    }

    // Função para verificar dados do Usuário ----------------------------------------------
    useEffect(() => {
        async function verifyLogin() {

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //tem usuario logado
                    setUser(true);
                    setDetailUser({
                        uid: user.uid,
                        email: user.email
                    })
                } else {
                    //não possui usuario logado
                    setUser(false);
                    setDetailUser({});
                }
            })

        }
        verifyLogin();
    }, [])

    // ESTRUTURA VISUAL DA PÁGINA ===========================================================
    return (
        <>
            {user && (
                <div>
                    <strong>Seja bem-vindo(a)</strong>
                    <br />
                    <span>ID: {detailUser.uid}</span>
                    <br />
                    <span>Email: {detailUser.email}</span>
                    <br />
                    <button onClick={logOutUser}>Sair</button>
                </div>
            )}
            {/* Container Geral do Formulário --------------------------------------------*/}
            <div className="main-container">
                {/* Formulário de Login */}
                <form className="login-form form">
                    <h1 className="login-title title">Bem vindo de volta!</h1>
                    {/* Label e Input do Email do usuário */}
                    <label className="login-email-label label">Email: </label>
                    <textarea className="email-input input"
                        type="email"
                        placeholder="Digite um email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    {/* Label e Input da Senha do usuário */}
                    <label className="login-password-label label">Senha: </label>
                    <textarea className="password-input input"
                        type="password"
                        placeholder="Digite uma senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <div className="button-container">
                        {/* Button para logar usuário existente */}
                        <button className="login-button button" onClick={loginUser}>Entrar</button>
                        {/* Button para registrar novo usuário */}
                        <button className="register-button button" onClick={createUser}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}