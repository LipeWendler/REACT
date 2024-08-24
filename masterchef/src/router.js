import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/home";
import AddRecipe from "./pages/AddRecipe/addRecipe";


export default function RouteApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AdicionarReceita" element={<AddRecipe />} />
            </Routes>

        </BrowserRouter>
    )
}