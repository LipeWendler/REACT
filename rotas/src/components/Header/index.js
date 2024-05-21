import './style.css'

import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className='header-container'>
            <h2 className='title'>REACT.JS</h2>
            <div className='pagesLinks'>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/sobre'>Sobre</Link>
                <Link className='link' to='/contato'>Contato</Link>
                <Link className='link' to='/produto/1'>Produto 1</Link>
            </div>
        </header>
    );
}