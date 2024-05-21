import { Link } from "react-router-dom";

export default function Sobre (){
    return(
        <div>
            <h1>Página Sobre a Empresa</h1>
            <span>Ratchu Fliko Rattio Fly</span>

            <br/>

            <Link to='/'>Home</Link><br/>
            <Link to='/contato'>Contato</Link>

            <hr/>

            <Link to='/produto/1'>Acessar Produto 1</Link>
        </div>
    );
}