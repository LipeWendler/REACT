import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";

export default function RouteApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}