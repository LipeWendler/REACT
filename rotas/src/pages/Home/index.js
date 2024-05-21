import { Link } from "react-router-dom";

export default function Home (){
    return(
        <div>
            <h1>Bem-vindo à página HOME</h1>
            <span>Felipe Wendler</span>

            <br/>

            <Link to='/sobre'>Sobre</Link><br/>
            <Link to='/contato'>Contato</Link>

            <hr/>

            <Link to='/produto/1'>Acessar Produto 1</Link>
        </div>
    );
}