import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← Добавь импорт
import Nudes from './pages/nudes'; // ← Импортируй компонент Work
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Nudes" element={<Nudes />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        {/* Добавь другие маршруты сюда */}
        {/* <Route path="/" element={<Home />} /> если у тебя есть главная страница */}
      </Routes>
    </div>
  );
}

export default App;