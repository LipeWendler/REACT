import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/home";
import ShareRecipe from "./pages/ShareRecipe/shareRecipe";


export default function RouteApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AdicionarReceita" element={<ShareRecipe />} />
            </Routes>
        </BrowserRouter>
    )
}