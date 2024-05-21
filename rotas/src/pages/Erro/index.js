import { Link } from "react-router-dom";

export default function Erro(){
    return(
        <div>
            <h2>Cago no pau, fico vegetando ai!</h2>
            <span>Agora achemo esses trem aqui:</span>

            <Link to='/'>Home</Link>
            <Link to='/sobre'>Sobre</Link>
            <Link to='/contato'>Contato</Link>
        </div>
    );
}