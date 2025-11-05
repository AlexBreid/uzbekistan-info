import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← Добавь импорт
import Collection from './pages/Collection'; // ← Импортируй компонент Work
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        {/* Добавь другие маршруты сюда */}
        {/* <Route path="/" element={<Home />} /> если у тебя есть главная страница */}
      </Routes>
    </div>
  );
}

export default App;