import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← Добавь импорт
import Work from './pages/work'; // ← Импортируй компонент Work
import Epidemy from './pages/epidemy'; 
import QuizTashkent from './pages/QuizTashkent'; 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/work" element={<Work />} />
        <Route path="/epidemy" element={<Epidemy />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        {/* Добавь другие маршруты сюда */}
        {/* <Route path="/" element={<Home />} /> если у тебя есть главная страница */}
      </Routes>
    </div>
  );
}

export default App;