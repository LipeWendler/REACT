import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Contato from './pages/Contato';
import Erro from './pages/Erro';
import Produto from './pages/Produto';
import Sobre from './pages/Sobre';
import Header from './components/Header';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sobre" element={<Sobre/>}/>
                <Route path="/contato" element={<Contato/>}/>
                <Route path="/produto/:id" element={<Produto/>}/>
                <Route path="*" element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    );
}