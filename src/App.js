import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← Добавь импорт
import Collection from './pages/Collection'; // ← Импортируй компонент Work
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 
import RoulettePremium from "./pages/Roulette_premium";
import TikTokLikeSite from './pages/Tiktoklikesite';
import BankUZ from './pages/bankUZ';
import GulnoraKosimova from './pages/GulnoraKosimova';
import ORMbank from './pages/ORMbank';
import FileManager from './pages/FileManager';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        <Route path="/Roulette_premium" element={<RoulettePremium />} />
        <Route path="/TikTokLikeSite" element={<TikTokLikeSite />} />
        <Route path="/BankUZ" element={<BankUZ />} />
        <Route path="/GulnoraKosimova" element={<GulnoraKosimova />} />
        <Route path="/ORMbank" element={<ORMbank />} />
        <Route path="/FileManager" element={<FileManager />} />
        {/* Добавь другие маршруты сюда */}
        {/* <Route path="/" element={<Home />} /> если у тебя есть главная страница */}
      </Routes>
    </div>
  );
}

export default App;