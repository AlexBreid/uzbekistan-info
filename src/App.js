import React, { useEffect } from 'react';
// Добавляем useLocation для отслеживания изменений маршрута
import { Routes, Route, useLocation } from 'react-router-dom'; 
import Nudes from './pages/nudes'; 
import QuizTashkent from './pages/QuizTashkent'; 
import Bonus from './pages/bonus';
import Tanishuv from "./pages/Tanishuv" 

function App() {
  const location = useLocation();
  const PIXEL_ID = '836297435654069';

  // 1. Инициализация Meta Pixel - запускается только один раз при монтировании компонента App.
  useEffect(() => {
    // Проверяем, был ли код Пикселя уже загружен
    if (window.fbq) return;

    // Вставка базового кода Пикселя, предоставленного пользователем
    (function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js'));

    // Инициализация
    window.fbq('init', PIXEL_ID);
    console.log(`Meta Pixel Initialized: ${PIXEL_ID}`);
    
    // ПРИМЕЧАНИЕ: Здесь мы не вызываем 'fbq('track', 'PageView')', 
    // так как это сделает следующий useEffect при первом рендере, 
    // предотвращая двойное срабатывание.

  }, []);

  // 2. Отслеживание PageView для SPA - запускается при каждом изменении маршрута.
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
        {/* Используем компоненты, определенные выше */}
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