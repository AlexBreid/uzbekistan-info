import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // <-- Добавлены useLocation и useEffect
import Collection from './pages/Collection';
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 

// Функция для безопасного отслеживания PageView
const trackPageView = () => {
  if (typeof window.fbq === 'function') {
    // Отправляем PageView при смене маршрута
    window.fbq('track', 'PageView'); 
  }
};

function App() {
  const location = useLocation(); // Хук для отслеживания маршрута

  useEffect(() => {
    // 1. Отслеживаем PageView при каждой смене маршрута (URL)
    trackPageView();
    
    // 2. Отключаем автоматическое отслеживание изменений истории,
    //    чтобы избежать двойного срабатывания PageView. 
    if (typeof window.fbq === 'function') {
         window.fbq.disablePushState = true; 
    }
    
  }, [location.pathname]); // Срабатывает при каждом изменении пути

  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        {/* Добавь другие маршруты сюда */}
      </Routes>
    </div>
  );
}

export default App;