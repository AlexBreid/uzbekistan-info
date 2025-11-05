import React, { useEffect } from 'react';
// Добавляем useLocation для отслеживания изменений маршрута
import { Routes, Route, useLocation } from 'react-router-dom'; 
import Nudes from './pages/nudes'; 
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 

function App() {
  const location = useLocation();

  // Хук, который срабатывает при каждом изменении URL (маршрута) в SPA
  useEffect(() => {
    // Проверяем, что глобальная функция fbq доступна
    if (window.fbq) {
      // Отправляем событие PageView при смене маршрута
      window.fbq('track', 'PageView'); 
      console.log(`Meta Pixel: PageView tracked for route: ${location.pathname}`);
    }
  }, [location.pathname]); // Зависимость от pathname гарантирует, что хук сработает при каждом переходе

  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Nudes" element={<Nudes />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        {/* Добавь другие маршруты сюда */}
      </Routes>
    </div>
  );
}

export default App;