import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Matrix from "./pages/Matrix";
import Parallel from "./pages/Parallel";
import './App.css';

function App() {
  // Inicializar o estado com o valor de "dark-theme" no localStorage ou com base na preferência do sistema
  const storedTheme = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(false || storedTheme);

  // Função para alternar o tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Efeito para atualizar a classe 'dark-theme' no body
  useEffect(() => {
    const bodyClass = document.body.classList;
    if (darkMode) {
      bodyClass.add('dark-theme');
      localStorage.setItem('darkMode', 'true');
    } else {
      bodyClass.remove('dark-theme');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">🏠 Home</Link>
          <Link to="/sorting">📊 Ordenação</Link>
          <Link to="/matrix">🔢 Matrizes</Link>
          <Link to="/parallel">⚡ Paralelismo</Link>
        </nav>

        {/* Ícone para alternar o tema (sol ou lua) */}
        <i 
          className={darkMode ? "fas fa-sun theme-toggle" : "fas fa-moon theme-toggle"} 
          onClick={toggleTheme}>
        </i>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/matrix" element={<Matrix />} />
          <Route path="/parallel" element={<Parallel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;