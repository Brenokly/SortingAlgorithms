import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Matrix from "./pages/Matrix";
import Parallel from "./pages/Parallel";
import { JSX } from "react";

function App(): JSX.Element {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">🏠 Home</Link>
          <Link to="/sorting">📊 Ordenação</Link>
          <Link to="/matrix">🔢 Matrizes</Link>
          <Link to="/parallel">⚡ Paralelismo</Link>
        </nav>

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