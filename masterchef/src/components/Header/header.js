
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
    return (
        <header className="header-container">
            <strong className="header-title">RECEITAS <span>DA</span> CLEIDE </strong>
            <nav className='navbar-container'>
                <Link className='navbar-item' to="/" >Página Inicial</Link>
                <Link className='navbar-item' to="/AdicionarReceita" >Compartilhar Receita</Link>
            </nav>
        </header>
    )
}