import { useParams } from "react-router-dom";

export default function Produto(){

    const { id } = useParams();

    return(
        <div>
            <h2>PÁGINA DETALHE DO PRODUTO</h2>
            <span>
                Meu Produto é {id}
            </span>
        </div>
    );
}