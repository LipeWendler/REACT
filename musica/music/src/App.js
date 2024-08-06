import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from './components/Home';
import Artista from './components/Artista';
import './App.css';


export default function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav-container">
          <ul className="list-container">
            <li className="list-item"><Link to='/'>Home</Link></li>
            <li className="list-item"><Link to='/artista'>Artista</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/artista' element={<Artista />}></Route>

          <Route path='/' element={<Home />}></Route>

        </Routes>
      </div>
    </Router>
  );
}