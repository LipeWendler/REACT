import { Link } from "react-router-dom";

export default function Contato (){
    return(
        <div>
            <h1>Entre em Contato Conosco!</h1>
            <span>Ratchu Fliko Rattio Fly</span>

            <br/>

            <Link to='/'>Home</Link><br/>
            <Link to='/spbre'>Sobre</Link>

            <hr/>

            <Link to='/produto/1'>Acessar Produto 1</Link>
        </div>
    );
}