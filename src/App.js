import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← Добавь импорт
import Collection from './pages/Collection'; // ← Импортируй компонент Work
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 
import Roulette_premium from "./pages/Roulette_premium" ;
import TikTokLikeSite from './pages/Tiktoklikesite';
import BankUZ from './pages/bankUZ';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        <Route path="/Roulette_premium" element={<Roulette_premium />} />
        <Route path="/TikTokLikeSite" element={<TikTokLikeSite />} />
        <Route path="/BankUZ" element={<BankUZ />} />
        {/* Добавь другие маршруты сюда */}
        {/* <Route path="/" element={<Home />} /> если у тебя есть главная страница */}
      </Routes>
    </div>
  );
}

export default App;