import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Collection from './pages/Collection';
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv";
import ThankYou from "./pages/ThankYou"; // <-- НОВЫЙ ИМПОРТ

// Функция для безопасного отслеживания PageView
const trackPageView = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView'); 
  }
};

function App() {
  const location = useLocation();

  useEffect(() => {
    // Отслеживание PageView при каждой смене маршрута
    trackPageView();
    
    if (typeof window.fbq === 'function') {
         window.fbq.disablePushState = true; 
    }
    
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/Tanishuv" element={<Tanishuv />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/QuizTashkent" element={<QuizTashkent />} />
        <Route path="/thankyou" element={<ThankYou />} /> {/* <-- НОВЫЙ МАРШРУТ */}
      </Routes>
    </div>
  );
}

export default App;