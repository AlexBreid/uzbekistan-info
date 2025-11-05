import React, { useEffect } from 'react';

// Функция для безопасного вызова Meta Pixel
const trackMetaEvent = (eventName, properties = {}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, properties);
  }
};

export default function ThankYouPage() {
    
    // 💡 ОТПРАВЛЯЕМ СОБЫТИЕ LEAD ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    useEffect(() => {
        trackMetaEvent('Lead', {
             content_name: 'Download Completed - Thank You Page', // Кастомное название
             value: 0.00,
             currency: 'USD'
        });
        
    }, []); // Пустой массив зависимостей гарантирует, что сработает только один раз

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: '#1c1c1c', 
            color: '#fff',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3rem', color: '#ffbb00' }}>Rahmat!</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>
                Yuklab olish jarayoni boshlandi.
            </p>
            <p style={{ fontSize: '1rem', color: '#aaa' }}>
                Tekshirib ko‘ring, fayl tez orada yuklab olinadi.
            </p>
        </div>
    );
}