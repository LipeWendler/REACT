import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './header.css';

import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConnection';

export default function Header() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(false);
    const [detalhesUsuario, setDetalhesUsuario] = useState({});

    // Função para verificar se o usuário logou com sucesso
    useEffect(() => {
        async function verificarLogin() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //Tem usuário logado
                    setUsuario(true);
                    setDetalhesUsuario({
                        uid: user.uid,
                        email: user.email
                    });
                }
                else {
                    //Não possui usuário logado
                    setUsuario(false);
                    setDetalhesUsuario({});
                }
            })
        }
        verificarLogin();
    }, [])

    // Função para Sair da conta
    async function fazerLogout() {
        await signOut(auth)
        setUsuario(false)
        setDetalhesUsuario({})
        navigate("/")
    }

    return (
        <header className="header-container">
            <strong className="header-title">LISTA <span>DE</span> TAREFAS </strong>
            <nav className='navbar-container'>
                {usuario && (
                    <div className='user-info-container'>
                        <span>Seja bem-vindo(a) </span>
                        <span className='user-email'>{detalhesUsuario.email}</span>
                    </div>
                )}
                <button className='navbar-item' onClick={fazerLogout}>LogOut</button>
            </nav>
        </header>
    )
}